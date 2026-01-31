import { LandingNavbar } from "./components/landing/LandingNavbar";
import { HeroSection } from "./components/landing/HeroSection";
import { FeaturesSection } from "./components/landing/FeaturesSection";
import { LandingFooter } from "./components/landing/LandingFooter";

const Home = () => {
  return (
    <main className="min-h-screen bg-brand-black text-white font-satoshi">
      <LandingNavbar />
      <HeroSection />
      <FeaturesSection />
      <LandingFooter />
    </main>
  );
};

export default Home;
