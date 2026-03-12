'use client';

export default function StatsSection() {
  const stats = [
    { number: 'AI-Powered', label: 'Smart Email Generation' },
    { number: '5 Free', label: 'Emails Per Day' },
    { number: '< 60s', label: 'Average Generation Time' },
    { number: 'Gmail', label: 'Direct Integration' },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-500 mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
