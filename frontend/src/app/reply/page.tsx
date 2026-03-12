'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const tones = [
  { value: 'professional', label: 'Professional', description: 'Confident & clear', icon: '💼' },
  { value: 'friendly', label: 'Friendly', description: 'Warm & conversational', icon: '😊' },
  { value: 'enthusiastic', label: 'Enthusiastic', description: 'Energetic & positive', icon: '🚀' },
  { value: 'formal', label: 'Formal', description: 'Respectful & structured', icon: '🎓' },
];

export default function ReplyPage() {
  const [originalEmail, setOriginalEmail] = useState('');
  const [replyContext, setReplyContext] = useState('');
  const [tone, setTone] = useState('professional');
  const [generatedReply, setGeneratedReply] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!originalEmail.trim()) {
      setError('Please paste the email you want to reply to');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedReply('');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/email/reply`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            originalEmail: originalEmail.trim(),
            context: replyContext.trim(),
            tone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate reply');
      }

      setGeneratedReply(data.data.reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (generatedReply) {
      await navigator.clipboard.writeText(generatedReply);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRegenerate = () => {
    handleSubmit(new Event('submit') as unknown as React.FormEvent);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>↩️</span>
            Smart Reply Generator
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Reply to Emails Instantly
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Paste any email and get a professional, context-aware reply in seconds. Perfect for cold email responses.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left - Input Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Original Email */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-500">📧</span>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">Paste the Email</h2>
                      <p className="text-sm text-gray-500">Copy and paste the email you received</p>
                    </div>
                  </div>

                  <textarea
                    value={originalEmail}
                    onChange={(e) => setOriginalEmail(e.target.value)}
                    rows={12}
                    placeholder="Hi [Your Name],&#10;&#10;I came across your profile and was impressed by your work...&#10;&#10;[Paste the full email here]"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  />
                </div>

                {/* Reply Context */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-500">💡</span>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">Add Context (Optional)</h2>
                      <p className="text-sm text-gray-500">Any specific points you want to include?</p>
                    </div>
                  </div>

                  <textarea
                    value={replyContext}
                    onChange={(e) => setReplyContext(e.target.value)}
                    rows={4}
                    placeholder="e.g., 'Mention my availability next week', 'Interested but need to discuss pricing', 'Ask for more details about the project scope'"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none"
                  />
                </div>

                {/* Tone Selection */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-orange-500">🎯</span>
                    </div>
                    <div>
                      <h2 className="font-semibold text-gray-900">Select Tone</h2>
                      <p className="text-sm text-gray-500">How should your reply sound?</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {tones.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setTone(t.value)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          tone === t.value
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span>{t.icon}</span>
                          <div className="font-medium text-gray-900">{t.label}</div>
                        </div>
                        <div className="text-xs text-gray-500">{t.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button - Attractive Design */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:via-gray-300 disabled:to-gray-300 text-white font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl disabled:scale-100 disabled:shadow-none overflow-hidden"
                >
                  {/* Animated background shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  
                  {/* Button content */}
                  <div className="relative flex items-center justify-center gap-3">
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span className="text-lg">Generating Your Reply...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">✨</span>
                        <span className="text-lg">Generate Smart Reply</span>
                        <svg 
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </div>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300 -z-10"></div>
                </button>
              </form>
            </div>

            {/* Right - Reply Preview */}
            <div>
              <div className="sticky top-24">
                {generatedReply ? (
                  /* Generated Reply Display */
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
                    {/* Header */}
                    <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white">
                        <span>✉️</span>
                        <span className="font-semibold">Your Reply is Ready!</span>
                      </div>
                      <button
                        onClick={handleRegenerate}
                        className="text-white/80 hover:text-white text-sm flex items-center gap-1 transition-colors"
                      >
                        <span>🔄</span>
                        Regenerate
                      </button>
                    </div>

                    <div className="p-6 space-y-4">
                      {/* Reply Body */}
                      <div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Your Reply
                        </span>
                        <div className="mt-2 bg-gray-50 rounded-lg px-4 py-4 text-gray-700 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                          {generatedReply}
                        </div>
                      </div>

                      {/* Copy Button */}
                      <button
                        onClick={handleCopy}
                        className="w-full py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        {copied ? (
                          <>
                            <span>✓</span>
                            Copied to Clipboard!
                          </>
                        ) : (
                          <>
                            <span>📋</span>
                            Copy Reply
                          </>
                        )}
                      </button>

                      {/* Tips */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <span className="text-blue-600 text-sm">💡</span>
                          <div className="text-sm text-blue-900">
                            <p className="font-medium mb-1">Pro Tip</p>
                            <p className="text-blue-700">
                              Review and personalize the reply before sending. Add specific details to make it more genuine.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Empty State */
                  <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Your Reply Preview</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Paste an email and click &quot;Generate Smart Reply&quot; to see your AI-generated response here.
                    </p>

                    {/* Quick Tips */}
                    <div className="text-left bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-yellow-500">💡</span>
                        <span className="font-medium text-gray-700 text-sm">Quick Tips</span>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Include the sender&apos;s name in the email for personalization
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Add context about your availability or constraints
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Choose a tone that matches your relationship
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          Regenerate if you need a different approach
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16 bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              How Smart Reply Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📨</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">1. Paste Email</h3>
                <p className="text-gray-600 text-sm">
                  Copy the email you received and paste it in the form above.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">2. AI Analyzes</h3>
                <p className="text-gray-600 text-sm">
                  Our AI understands the context, intent, and tone of the email.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✍️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">3. Get Reply</h3>
                <p className="text-gray-600 text-sm">
                  Receive a professional, context-aware reply you can send immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
