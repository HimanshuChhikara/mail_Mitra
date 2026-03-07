'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface EmailStats {
  totalSent: number;
  totalFailed: number;
  todaySent: number;
  weekSent: number;
  successRate: number;
}

interface RecentEmail {
  id: string;
  recipientEmail: string;
  subject: string;
  prospectName: string;
  companyName: string;
  status: 'sent' | 'failed';
  sentAt: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [gmailUser, setGmailUser] = useState<{ email: string; name: string } | null>(null);
  const [stats, setStats] = useState<EmailStats | null>(null);
  const [recentEmails, setRecentEmails] = useState<RecentEmail[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkSessionAndLoadStats = async (token: string) => {
      try {
        // Check session first
        const sessionResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/session`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const sessionData = await sessionResponse.json();

        if (!sessionData.connected) {
          localStorage.removeItem('gmail_token');
          router.push('/generate');
          return;
        }

        setGmailUser(sessionData.user);

        // Load stats
        const statsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/stats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const statsData = await statsResponse.json();

        if (statsData.success) {
          setStats(statsData.stats);
          setRecentEmails(statsData.recentEmails);
        }
      } catch (err) {
        console.error('Error loading dashboard:', err);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    const token = localStorage.getItem('gmail_token');
    if (!token) {
      router.push('/generate');
      return;
    }
    
    checkSessionAndLoadStats(token);
  }, [router]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading your dashboard...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-4">
                <span>📊</span>
                Email Dashboard
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Welcome back, {gmailUser?.name?.split(' ')[0] || 'there'}!
              </h1>
              <p className="text-gray-400">
                Track your email outreach and see how your cold emails are performing.
              </p>
            </div>
            {gmailUser && (
              <div className="hidden md:flex items-center gap-3 bg-white/10 rounded-lg px-4 py-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {gmailUser.name?.[0] || gmailUser.email[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-medium">{gmailUser.name}</p>
                  <p className="text-gray-400 text-sm">{gmailUser.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {/* Total Sent */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-green-500 text-xl">✉️</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats?.totalSent || 0}</p>
              <p className="text-sm text-gray-500">Total Emails Sent</p>
            </div>

            {/* Today's Emails */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-xl">📅</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats?.todaySent || 0}</p>
              <p className="text-sm text-gray-500">Sent Today</p>
            </div>

            {/* This Week */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-500 text-xl">📈</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats?.weekSent || 0}</p>
              <p className="text-sm text-gray-500">This Week</p>
            </div>

            {/* Success Rate */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-orange-500 text-xl">🎯</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stats?.successRate || 100}%</p>
              <p className="text-sm text-gray-500">Success Rate</p>
            </div>
          </div>

          {/* Recent Emails Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Recent Emails</h2>
                <p className="text-sm text-gray-500">Your latest email outreach activity</p>
              </div>
              <button
                onClick={() => router.push('/generate')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <span>✨</span>
                Generate New Email
              </button>
            </div>

            {recentEmails.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sent At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentEmails.map((email) => (
                      <tr key={email.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {email.prospectName || 'Unknown'}
                            </p>
                            <p className="text-sm text-gray-500">{email.recipientEmail}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-gray-900 truncate max-w-xs">{email.subject}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm text-gray-600">{email.companyName || '-'}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              email.status === 'sent'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {email.status === 'sent' ? '✓ Sent' : '✗ Failed'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(email.sentAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📭</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">No emails sent yet</h3>
                <p className="text-gray-500 text-sm mb-6">
                  Start sending cold emails and track your outreach here.
                </p>
                <button
                  onClick={() => router.push('/generate')}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  <span>✨</span>
                  Generate Your First Email
                </button>
              </div>
            )}
          </div>

          {/* Free Tier Notice */}
          <div className="mt-6 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🎁</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">Free Plan</h3>
                <p className="text-gray-600 text-sm mb-3">
                  You&apos;re on the free plan with <strong>5 emails per day</strong>. 
                  Upgrade to Pro for unlimited emails and advanced features.
                </p>
                <button className="text-orange-600 hover:text-orange-700 font-medium text-sm inline-flex items-center gap-1">
                  Upgrade to Pro
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
