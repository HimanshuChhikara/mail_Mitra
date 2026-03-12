'use client';

import { useState } from 'react';
import Link from 'next/link';

type Mode = 'write' | 'reply';

export default function InteractiveDemo() {
  const [mode, setMode] = useState<Mode>('write');
  const [recipient, setRecipient] = useState('');
  const [keyPoints, setKeyPoints] = useState('');
  const [originalEmail, setOriginalEmail] = useState('');
  const [tone, setTone] = useState('professional');

  // Check if form is ready to generate
  const isWriteReady = recipient.trim() && keyPoints.trim();
  const isReplyReady = originalEmail.trim();

  // Quick template click handlers
  const handleTemplateClick = (template: string) => {
    if (template === 'Sales Pitch') {
      setRecipient('Marketing Manager at Tech Startup');
      setKeyPoints('I\'m a freelance web developer specializing in React and Next.js. I noticed your company is growing rapidly. I can help build your marketing website in 3 weeks with modern design and SEO optimization.');
    } else if (template === 'Follow Up') {
      setRecipient('Potential Client from Last Week');
      setKeyPoints('Following up on our conversation about the web project. I\'ve prepared some mockups and would love to show you. Available this week for a quick 15-min call?');
    } else if (template === 'Meeting Request') {
      setRecipient('CEO of Growing SaaS Company');
      setKeyPoints('I help SaaS companies improve their conversion rates. Would love to discuss how we can optimize your landing pages. Are you free for a 20-minute call next week?');
    } else if (template === 'Partnership') {
      setRecipient('Founder of Complementary Business');
      setKeyPoints('I run a design agency and noticed we serve similar clients. I think there\'s an opportunity for us to collaborate and refer clients to each other. Would you be open to exploring this?');
    }
  };

  const tones = [
    { value: 'professional', label: 'Professional', icon: '💼' },
    { value: 'friendly', label: 'Friendly', icon: '😊' },
    { value: 'formal', label: 'Formal', icon: '🎩' },
    { value: 'enthusiastic', label: 'Enthusiastic', icon: '🚀' },
  ];

  const quickTemplates = [
    { icon: '🚀', label: 'Sales Pitch', bg: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
    { icon: '👋', label: 'Follow Up', bg: 'bg-green-50 hover:bg-green-100 border-green-200' },
    { icon: '📅', label: 'Meeting Request', bg: 'bg-purple-50 hover:bg-purple-100 border-purple-200' },
    { icon: '🤝', label: 'Partnership', bg: 'bg-orange-50 hover:bg-orange-100 border-orange-200' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>⚡</span>
            Try It Now - Free
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            See MailMitra in Action
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Generate professional emails or smart replies in seconds. No signup required to try.
          </p>
        </div>

        {/* Interactive Demo Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto">
          {/* Mode Selector */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
            <div className="flex gap-3">
              <button
                onClick={() => setMode('write')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
                  mode === 'write'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'bg-orange-400/30 text-white hover:bg-orange-400/50'
                }`}
              >
                <span>✏️</span>
                Write New Email
              </button>
              <button
                onClick={() => setMode('reply')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-semibold transition-all ${
                  mode === 'reply'
                    ? 'bg-white text-orange-600 shadow-lg'
                    : 'bg-orange-400/30 text-white hover:bg-orange-400/50'
                }`}
              >
                <span>↩️</span>
                Reply to Email
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {mode === 'write' ? (
              // Write New Email Mode
              <>
                {/* Quick Templates */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    📋 Or Choose a Quick Start Template:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {quickTemplates.map((template) => (
                      <button
                        key={template.label}
                        onClick={() => handleTemplateClick(template.label)}
                        className={`${template.bg} border rounded-lg p-3 transition-all hover:scale-105 hover:shadow-md active:scale-95`}
                      >
                        <div className="text-2xl mb-1">{template.icon}</div>
                        <div className="text-xs font-medium text-gray-700">{template.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipient */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                    <span>👤 Who are you sending this to?</span>
                    {recipient && (
                      <span className="text-xs font-normal text-green-600 flex items-center gap-1">
                        <span>✓</span> {recipient.length} characters
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g., Marketing Manager at Tech Startup"
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 outline-none transition-all ${
                      recipient 
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-200 bg-green-50/30' 
                        : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
                    }`}
                  />
                </div>

                {/* Key Points */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                    <span>📝 Key points to cover:</span>
                    {keyPoints && (
                      <span className="text-xs font-normal text-green-600 flex items-center gap-1">
                        <span>✓</span> {keyPoints.length} characters
                      </span>
                    )}
                  </label>
                  <textarea
                    value={keyPoints}
                    onChange={(e) => setKeyPoints(e.target.value)}
                    placeholder="e.g., I'm a freelance web developer specializing in React. I noticed your company is growing. I can help build your website in 3 weeks."
                    rows={4}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 outline-none transition-all resize-none ${
                      keyPoints 
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-200 bg-green-50/30' 
                        : 'border-gray-200 focus:border-orange-500 focus:ring-orange-200'
                    }`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">
                      💡 Tip: Be specific about your value proposition and what makes you different
                    </p>
                    {isWriteReady && (
                      <span className="text-xs font-medium text-green-600 animate-pulse">
                        Ready to generate! ✨
                      </span>
                    )}
                  </div>
                </div>

                {/* Tone Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    🎯 Tone of Voice:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {tones.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setTone(t.value)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          tone === t.value
                            ? 'border-orange-500 bg-orange-50 shadow-md'
                            : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-2xl mb-1">{t.icon}</div>
                        <div className="text-xs font-medium text-gray-700">{t.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="/generate"
                  className={`group relative w-full bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-700 hover:via-orange-600 hover:to-orange-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:shadow-2xl flex items-center justify-center gap-3 overflow-hidden ${
                    isWriteReady 
                      ? 'hover:scale-[1.02] animate-pulse' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={(e) => !isWriteReady && e.preventDefault()}
                >
                  {/* Animated shimmer */}
                  {isWriteReady && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}
                  
                  <span className="relative text-2xl group-hover:rotate-12 transition-transform duration-300">✨</span>
                  <span className="relative text-lg">
                    {isWriteReady ? 'Generate My Email Now' : 'Fill in details to generate'}
                  </span>
                  {isWriteReady && (
                    <svg 
                      className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </Link>
              </>
            ) : (
              // Reply to Email Mode
              <>
                {/* Original Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center justify-between">
                    <span>📧 Paste the email you received:</span>
                    {originalEmail && (
                      <span className="text-xs font-normal text-green-600 flex items-center gap-1">
                        <span>✓</span> {originalEmail.length} characters
                      </span>
                    )}
                  </label>
                  <textarea
                    value={originalEmail}
                    onChange={(e) => setOriginalEmail(e.target.value)}
                    placeholder="Paste the entire email you want to reply to..."
                    rows={6}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 outline-none transition-all resize-none ${
                      originalEmail 
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-200 bg-green-50/30' 
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-200'
                    }`}
                  />
                  {isReplyReady && (
                    <p className="text-xs font-medium text-green-600 mt-1 animate-pulse flex items-center gap-1">
                      <span>✨</span> Ready to generate reply!
                    </p>
                  )}
                </div>

                {/* Tone Selector */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    🎯 Reply Tone:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {tones.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setTone(t.value)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          tone === t.value
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-2xl mb-1">{t.icon}</div>
                        <div className="text-xs font-medium text-gray-700">{t.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href="/reply"
                  className={`group relative w-full bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:shadow-2xl flex items-center justify-center gap-3 overflow-hidden ${
                    isReplyReady 
                      ? 'hover:scale-[1.02] animate-pulse' 
                      : 'opacity-60 cursor-not-allowed'
                  }`}
                  onClick={(e) => !isReplyReady && e.preventDefault()}
                >
                  {/* Animated shimmer */}
                  {isReplyReady && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  )}
                  
                  <span className="relative text-2xl group-hover:rotate-12 transition-transform duration-300">✨</span>
                  <span className="relative text-lg">
                    {isReplyReady ? 'Generate Smart Reply' : 'Paste email to reply'}
                  </span>
                  {isReplyReady && (
                    <svg 
                      className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* Bottom Info Bar */}
          <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>100% Free to Try</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>No Signup Required</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Below Demo */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">35-50%</div>
            <div className="text-gray-300 text-sm">Average Open Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">8-12%</div>
            <div className="text-gray-300 text-sm">Reply Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">&lt;60s</div>
            <div className="text-gray-300 text-sm">Time to Generate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
