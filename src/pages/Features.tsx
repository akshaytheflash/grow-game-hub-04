import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import FeaturesSection from "@/components/FeaturesSection";

const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <main className="pt-16">
        <FeaturesSection />
      </main>
    </div>
  );
};

export default Features;