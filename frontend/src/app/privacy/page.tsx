'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="pt-24 pb-12 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-400">
            Last updated: March 7, 2026
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8 prose prose-gray max-w-none">
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-6">
              Welcome to MailMitra. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <p className="text-gray-600 mb-4">When you use MailMitra, we may collect:</p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Google Account Information:</strong> When you sign in with Gmail, we receive your email address and name from Google.</li>
              <li><strong>Email Data:</strong> We temporarily process the email content you generate to send emails on your behalf. We do not store the content of your emails permanently.</li>
              <li><strong>Usage Data:</strong> We track basic usage statistics like number of emails sent to enforce daily limits.</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Generate personalized cold emails based on your input</li>
              <li>Send emails through Gmail on your behalf (with your permission)</li>
              <li>Track usage to enforce free tier limits (5 emails/day)</li>
              <li>Improve our service and user experience</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Google API Services</h2>
            <p className="text-gray-600 mb-6">
              MailMitra uses Google API Services to enable Gmail integration. Our use and transfer of information 
              received from Google APIs adheres to the{' '}
              <a 
                href="https://developers.google.com/terms/api-services-user-data-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
            <p className="text-gray-600 mb-6">
              Specifically, we only request access to send emails on your behalf. We do not:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Read your existing emails</li>
              <li>Access your contacts</li>
              <li>Store your Gmail credentials</li>
              <li>Share your data with third parties</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Data Storage & Security</h2>
            <p className="text-gray-600 mb-6">
              We store minimal data required for the service to function:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>OAuth tokens are stored securely and encrypted</li>
              <li>Email metadata (recipient, subject, timestamp) is stored for your dashboard</li>
              <li>We use industry-standard security measures to protect your data</li>
              <li>Data is stored on secure servers (MongoDB Atlas, Upstash Redis)</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
            <p className="text-gray-600 mb-6">
              We retain your data only as long as necessary to provide our services. You can request deletion 
              of your data at any time by contacting us or disconnecting your Gmail account.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your data</li>
              <li>Disconnect your Gmail account at any time</li>
              <li>Revoke MailMitra&apos;s access from your Google Account settings</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Third-Party Services</h2>
            <p className="text-gray-600 mb-6">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li><strong>Google OAuth:</strong> For Gmail authentication</li>
              <li><strong>OpenAI:</strong> For generating email content (no personal data shared)</li>
              <li><strong>MongoDB Atlas:</strong> For data storage</li>
              <li><strong>Vercel:</strong> For hosting</li>
              <li><strong>Railway:</strong> For backend hosting</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this privacy policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:himanshuchhikara19@gmail.com" className="text-orange-500 hover:text-orange-600">
                himanshuchhikara19@gmail.com
              </a>
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
