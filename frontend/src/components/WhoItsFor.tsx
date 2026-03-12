'use client';

export default function WhoItsFor() {
  const audiences = [
    {
      title: 'Freelance Developers & Designers',
      description: 'Land your next client by reaching out to startups and SMBs with emails that feel personal, not templated.',
      icon: '💻',
    },
    {
      title: 'Digital Marketing Agencies',
      description: 'Win retainers and project work with cold emails that showcase your expertise without sounding salesy.',
      icon: '📱',
    },
    {
      title: 'Startup Founders',
      description: 'Connect with investors, partners, and early customers. Build relationships that matter for your growth.',
      icon: '🚀',
    },
    {
      title: 'Business Consultants',
      description: 'Position yourself as a trusted advisor from the first email. No generic pitches, just value-driven outreach.',
      icon: '💼',
    },
    {
      title: 'Sales & BD Teams',
      description: 'Hit your targets with emails that get opened and replied to. Perfect for SaaS, B2B, and service businesses.',
      icon: '📊',
    },
    {
      title: 'Content Creators & Influencers',
      description: 'Pitch brands and sponsors with professional emails that respect their time and highlight your value.',
      icon: '🎨',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span>👥</span>
              Who It&apos;s For
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              Made for Every Indian Professional Who Reaches Out Cold
            </h2>

            <ul className="space-y-6">
              {audiences.map((audience, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-orange-200 group-hover:to-orange-100 transition-all">
                    <span className="text-xl">{audience.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1.5">{audience.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{audience.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Testimonial Card */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Gradient Background */}
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 relative p-8 flex flex-col justify-between">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                {/* Testimonial Content */}
                <div>
                  <p className="text-gray-800 text-lg sm:text-xl font-medium leading-relaxed mb-6">
                    &quot;Before MailMitra, I spent hours writing cold emails that barely got responses. 
                    Now I generate personalized emails in minutes, and my reply rate has genuinely improved. 
                    It understands the Indian business context perfectly.&quot;
                  </p>
                  
                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      AM
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Arjun Mehta</p>
                      <p className="text-gray-600 text-sm">Freelance Full-Stack Developer</p>
                      <p className="text-gray-500 text-xs">Bangalore</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-orange-200/30 rounded-full blur-2xl"></div>
                <div className="absolute bottom-4 left-4 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-xl">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-900 font-medium">Trusted by professionals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
