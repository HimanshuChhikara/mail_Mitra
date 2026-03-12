'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="pt-24 pb-16 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="text-orange-500">✨</span>
              Built for Indian Professionals
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              Cold Emails That{' '}
              <span className="text-orange-500">Actually Get Replies</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              MailMitra generates short, respectful, and culturally-aware cold emails for Indian freelancers, agencies, founders, and consultants. No fluff. No robotics. Just human outreach.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-8">
              <Link
                href="/generate"
                className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-7 rounded-lg transition-all duration-200 text-base inline-flex items-center justify-center gap-2"
              >
                Generate Your Email Free
                <span>→</span>
              </Link>
              <Link
                href="#how-it-works"
                className="w-full sm:w-auto bg-transparent hover:bg-slate-800 text-white font-medium py-3.5 px-7 rounded-lg border border-slate-600 transition-all duration-200 text-base text-center"
              >
                See How It Works
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700">
                <span className="text-green-400 text-lg">✓</span>
                <span className="text-gray-300 text-sm font-medium">Free to use</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700">
                <span className="text-blue-400 text-lg">🔒</span>
                <span className="text-gray-300 text-sm font-medium">Secure & Private</span>
              </div>
            </div>
          </div>

          {/* Right Content - Email Preview */}
          <div className="relative">
            <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
              {/* macOS Window Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-slate-700/50 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-3 text-sm text-gray-400">New Message</span>
              </div>
              
              {/* Email Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className="text-gray-500">To:</span>
                    <span className="text-blue-400">rajesh@nexatech.in</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">Subject:</span>
                    <span className="text-white font-medium">Quick intro — Freelance Developer who works with Tech startups</span>
                  </div>
                </div>
                
                <div className="border-t border-slate-700 pt-4 text-gray-300 text-sm leading-relaxed space-y-4">
                  <p>Hi Rajesh,</p>
                  <p>Hope this email finds you well.</p>
                  <p>I came across NexaTech and was genuinely impressed by what you&apos;re building in the tech space. I&apos;m Aditya Joshi, a freelance developer focused on React and Node.js applications.</p>
                  <p>I&apos;ve helped similar startups scale their digital products and reduce go-to-market time — and I thought there might be an interesting opportunity here.</p>
                  <p>Would you be open to a quick 15-minute call this week? No pressure at all.</p>
                  <div className="pt-2">
                    <p>Warm regards,</p>
                    <p>Aditya Joshi</p>
                  </div>
                </div>

                {/* Send Button */}
                <div className="mt-6 flex items-center gap-3">
                  <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                    Send Email
                  </button>
                  <button className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-gray-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 right-4 bg-green-500 text-white text-sm font-semibold py-2 px-4 rounded-full flex items-center gap-2 shadow-lg floating">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Response rate: 42% ↑
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
