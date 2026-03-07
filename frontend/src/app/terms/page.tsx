'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="pt-24 pb-12 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-400">
            Last updated: March 7, 2026
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8 prose prose-gray max-w-none">
            
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing and using MailMitra, you accept and agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-6">
              MailMitra is a cold email generator tool that helps professionals create personalized outreach emails. 
              The service includes AI-powered email generation and optional Gmail integration for sending emails directly.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">When using MailMitra, you agree to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>Use the service only for lawful purposes</li>
              <li>Not send spam, unsolicited emails, or harassing content</li>
              <li>Comply with all applicable laws, including CAN-SPAM, GDPR, and other anti-spam regulations</li>
              <li>Not use the service for any fraudulent or deceptive purposes</li>
              <li>Take responsibility for all emails sent using your account</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Free Tier Limitations</h2>
            <p className="text-gray-600 mb-6">
              The free tier of MailMitra allows you to generate and send up to 5 emails per day. 
              This limit resets every 24 hours. We reserve the right to modify these limits at any time.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Gmail Integration</h2>
            <p className="text-gray-600 mb-6">
              When you connect your Gmail account, you authorize MailMitra to send emails on your behalf. 
              You remain responsible for all content sent through your account. You can revoke this access 
              at any time through your Google Account settings or by disconnecting within MailMitra.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 mb-6">
              The MailMitra service, including its design, features, and content, is owned by us. 
              The emails generated using our service are yours to use as you see fit.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-600 mb-6">
              MailMitra is provided &quot;as is&quot; without warranties of any kind. We do not guarantee that:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
              <li>The service will be uninterrupted or error-free</li>
              <li>Generated emails will achieve any specific results</li>
              <li>The AI-generated content will be perfectly accurate</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              To the maximum extent permitted by law, MailMitra and its creators shall not be liable for 
              any indirect, incidental, special, or consequential damages arising from your use of the service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Account Termination</h2>
            <p className="text-gray-600 mb-6">
              We reserve the right to suspend or terminate your access to MailMitra if you violate these 
              terms or engage in abusive behavior. You may also disconnect your account at any time.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We may update these Terms of Service from time to time. Continued use of the service after 
              changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Contact</h2>
            <p className="text-gray-600 mb-6">
              For questions about these Terms of Service, please contact us at:{' '}
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
