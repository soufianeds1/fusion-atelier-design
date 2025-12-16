import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { NewYearCountdown } from "@/components/NewYearCountdown";
import { AboutSection } from "@/components/AboutSection";
import { FeaturedDishes } from "@/components/FeaturedDishes";
import { ReservationCTA } from "@/components/ReservationCTA";
import { Footer } from "@/components/Footer";
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <NewYearCountdown />
        <AboutSection />
        <FeaturedDishes />
        <ReservationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
