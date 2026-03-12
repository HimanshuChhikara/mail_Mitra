import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsSection from '@/components/StatsSection';
import ProblemSection from '@/components/ProblemSection';
import USPSection from '@/components/USPSection';
import InteractiveDemo from '@/components/InteractiveDemo';
import HowItWorks from '@/components/HowItWorks';
import WhoItsFor from '@/components/WhoItsFor';
import TestimonialsSection from '@/components/TestimonialsSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <StatsSection />
      <ProblemSection />
      <USPSection />
      <InteractiveDemo />
      <HowItWorks />
      <WhoItsFor />
      <TestimonialsSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
