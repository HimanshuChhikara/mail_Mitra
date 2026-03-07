import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import {
  getAuthUrl,
  getTokensFromCode,
  getUserInfo,
  sendEmail,
  refreshAccessToken,
} from '../services/gmailService';
import {
  saveSession,
  getSession,
  updateSession,
  deleteSession,
  UserSession,
} from '../services/sessionService';
import { EmailSent } from '../models/EmailSent';

// Generate JWT token
const generateToken = (email: string): string => {
  return jwt.sign({ email }, config.jwtSecret, { expiresIn: '7d' });
};

// Verify JWT token
export const verifyToken = (token: string): { email: string } | null => {
  try {
    return jwt.verify(token, config.jwtSecret) as { email: string };
  } catch {
    return null;
  }
};

// Get auth URL for Gmail OAuth
export const getGmailAuthUrl = (req: Request, res: Response): void => {
  try {
    const authUrl = getAuthUrl();
    res.json({ success: true, authUrl });
  } catch (error: any) {
    console.error('Auth URL error:', error?.message);
    res.status(500).json({ success: false, error: 'Failed to generate auth URL' });
  }
};

// Handle OAuth callback
export const handleGmailCallback = async (req: Request, res: Response): Promise<void> => {
  try {
    const { code } = req.query;

    if (!code || typeof code !== 'string') {
      res.redirect(`${config.frontendUrl}/generate?error=no_code`);
      return;
    }

    // Exchange code for tokens
    const tokens = await getTokensFromCode(code);

    if (!tokens.access_token || !tokens.refresh_token) {
      res.redirect(`${config.frontendUrl}/generate?error=no_tokens`);
      return;
    }

    // Get user info
    const userInfo = await getUserInfo(tokens.access_token);

    if (!userInfo.email) {
      res.redirect(`${config.frontendUrl}/generate?error=no_email`);
      return;
    }

    // Store session in Redis
    const session: UserSession = {
      email: userInfo.email,
      name: userInfo.name || '',
      picture: userInfo.picture || undefined,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: Date.now() + (tokens.expiry_date || 3600000),
    };

    await saveSession(userInfo.email, session);

    // Generate JWT
    const jwtToken = generateToken(userInfo.email);

    // Redirect to frontend with token
    res.redirect(`${config.frontendUrl}/generate?gmail_connected=true&token=${jwtToken}`);
  } catch (error: any) {
    console.error('OAuth callback error:', error?.message);
    res.redirect(`${config.frontendUrl}/generate?error=oauth_failed`);
  }
};

// Get current user session
export const getSessionHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      res.json({ success: true, connected: false });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      res.json({ success: true, connected: false });
      return;
    }

    const session = await getSession(decoded.email);
    if (!session) {
      res.json({ success: true, connected: false });
      return;
    }

    // Check if token expired and refresh if needed
    if (Date.now() > session.expiresAt - 60000) {
      try {
        const newCredentials = await refreshAccessToken(session.refreshToken);
        await updateSession(decoded.email, {
          accessToken: newCredentials.access_token!,
          expiresAt: Date.now() + (newCredentials.expiry_date || 3600000),
        });
      } catch {
        await deleteSession(decoded.email);
        res.json({ success: true, connected: false });
        return;
      }
    }

    res.json({
      success: true,
      connected: true,
      user: {
        email: session.email,
        name: session.name,
        picture: session.picture,
      },
    });
  } catch (error: any) {
    console.error('Get session error:', error?.message);
    res.status(500).json({ success: false, error: 'Failed to get session' });
  }
};

// Disconnect Gmail
export const disconnectGmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        await deleteSession(decoded.email);
      }
    }

    res.json({ success: true, message: 'Disconnected successfully' });
  } catch (error: any) {
    console.error('Disconnect error:', error?.message);
    res.status(500).json({ success: false, error: 'Failed to disconnect' });
  }
};

// Send email via Gmail
export const sendGmailEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({ success: false, error: 'Invalid token' });
      return;
    }

    const session = await getSession(decoded.email);
    if (!session) {
      res.status(401).json({ success: false, error: 'Session expired. Please reconnect Gmail.' });
      return;
    }

    const { to, subject, body } = req.body;

    // Validate input
    if (!to || !subject || !body) {
      res.status(400).json({ success: false, error: 'Missing required fields: to, subject, body' });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      res.status(400).json({ success: false, error: 'Invalid email address' });
      return;
    }

    // Refresh token if needed
    if (Date.now() > session.expiresAt - 60000) {
      try {
        const newCredentials = await refreshAccessToken(session.refreshToken);
        await updateSession(decoded.email, {
          accessToken: newCredentials.access_token!,
          expiresAt: Date.now() + (newCredentials.expiry_date || 3600000),
        });
        // Update local session object
        session.accessToken = newCredentials.access_token!;
      } catch {
        await deleteSession(decoded.email);
        res.status(401).json({ success: false, error: 'Session expired. Please reconnect Gmail.' });
        return;
      }
    }

    // Send email
    const result = await sendEmail(
      session.accessToken,
      session.refreshToken,
      to,
      subject,
      body
    );

    if (result.success) {
      // Track sent email in database
      try {
        await EmailSent.create({
          senderEmail: session.email,
          recipientEmail: to,
          subject: subject,
          prospectName: req.body.prospectName || '',
          companyName: req.body.companyName || '',
          status: 'sent',
          sentAt: new Date(),
          messageId: result.messageId,
        });
      } catch (trackError) {
        console.error('Failed to track sent email:', trackError);
        // Don't fail the request if tracking fails
      }

      res.json({
        success: true,
        message: 'Email sent successfully!',
        messageId: result.messageId,
      });
    } else {
      // Track failed email
      try {
        await EmailSent.create({
          senderEmail: session.email,
          recipientEmail: to,
          subject: subject,
          prospectName: req.body.prospectName || '',
          companyName: req.body.companyName || '',
          status: 'failed',
          sentAt: new Date(),
        });
      } catch (trackError) {
        console.error('Failed to track failed email:', trackError);
      }

      res.status(500).json({
        success: false,
        error: result.error || 'Failed to send email',
      });
    }
  } catch (error: any) {
    console.error('Send email error:', error?.message);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
};

// Get email stats for dashboard
export const getEmailStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({ success: false, error: 'Invalid token' });
      return;
    }

    // Get all sent emails for this user
    const emails = await EmailSent.find({ senderEmail: decoded.email })
      .sort({ sentAt: -1 })
      .limit(50)
      .lean();

    // Calculate stats
    const totalSent = await EmailSent.countDocuments({ 
      senderEmail: decoded.email, 
      status: 'sent' 
    });
    
    const totalFailed = await EmailSent.countDocuments({ 
      senderEmail: decoded.email, 
      status: 'failed' 
    });

    // Get today's count
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todaySent = await EmailSent.countDocuments({
      senderEmail: decoded.email,
      status: 'sent',
      sentAt: { $gte: todayStart },
    });

    // Get this week's count
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const weekSent = await EmailSent.countDocuments({
      senderEmail: decoded.email,
      status: 'sent',
      sentAt: { $gte: weekStart },
    });

    res.json({
      success: true,
      stats: {
        totalSent,
        totalFailed,
        todaySent,
        weekSent,
        successRate: totalSent + totalFailed > 0 
          ? Math.round((totalSent / (totalSent + totalFailed)) * 100) 
          : 100,
      },
      recentEmails: emails.map(email => ({
        id: email._id,
        recipientEmail: email.recipientEmail,
        subject: email.subject,
        prospectName: email.prospectName,
        companyName: email.companyName,
        status: email.status,
        sentAt: email.sentAt,
      })),
    });
  } catch (error: any) {
    console.error('Get stats error:', error?.message);
    res.status(500).json({ success: false, error: 'Failed to get stats' });
  }
};
