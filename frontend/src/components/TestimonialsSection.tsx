'use client';

export default function TestimonialsSection() {
  const benefits = [
    {
      title: "Save Time on Email Writing",
      description: "Stop spending 30+ minutes crafting each cold email. Generate personalized emails in under 60 seconds with AI assistance.",
      icon: '⚡',
      bgColor: 'bg-purple-500',
    },
    {
      title: "Culturally Aware Content",
      description: "Built specifically for Indian professionals. Our AI understands the cultural nuances needed for effective outreach in India.",
      icon: '🇮🇳',
      bgColor: 'bg-blue-500',
    },
    {
      title: "Direct Gmail Integration",
      description: "Send emails directly from your Gmail account with one click. Track all your outreach in a centralized dashboard.",
      icon: '📧',
      bgColor: 'bg-green-500',
    },
    {
      title: "Smart Email Tracking",
      description: "Monitor your sent emails, success rates, and daily statistics. Stay on top of your outreach campaigns effortlessly.",
      icon: '📊',
      bgColor: 'bg-orange-500',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-sm font-medium px-4 py-2 rounded-full mb-6">
            <span>✨</span>
            Why Choose MailMitra
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Built for Indian Freelancers & Agencies
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Everything you need to create professional cold emails that get responses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className={`w-12 h-12 ${benefit.bgColor} rounded-xl flex items-center justify-center text-2xl mb-4`}>
                {benefit.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            🔒 Your data is secure. We never store your email content permanently.
          </p>
        </div>
      </div>
    </section>
  );
}
