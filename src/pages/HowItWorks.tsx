import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import HowItWorksSection from "@/components/HowItWorksSection";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <main className="pt-16">
        <HowItWorksSection />
      </main>
    </div>
  );
};

export default HowItWorks;