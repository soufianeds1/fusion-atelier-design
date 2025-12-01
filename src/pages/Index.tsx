import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
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
        <AboutSection />
        <FeaturedDishes />
        <ReservationCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
