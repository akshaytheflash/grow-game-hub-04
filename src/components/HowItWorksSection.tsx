import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Settings, 
  Activity, 
  Trophy,
  ArrowRight,
  Sparkles
} from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      icon: UserPlus,
      title: "Create Your Profile",
      description: "Sign up and tell us about your farm, current practices, and sustainability goals.",
      color: "bg-gradient-hero"
    },
    {
      step: "02", 
      icon: Settings,
      title: "Customize Your Journey",
      description: "Set personalized challenges based on your farm type, size, and environmental objectives.",
      color: "bg-gradient-earth"
    },
    {
      step: "03",
      icon: Activity,
      title: "Track & Progress",
      description: "Monitor your sustainable practices, complete quests, and watch your impact grow in real-time.",
      color: "bg-gradient-sky"
    },
    {
      step: "04",
      icon: Trophy,
      title: "Earn & Celebrate",
      description: "Unlock achievements, climb leaderboards, and share your success with the farming community.",
      color: "bg-harvest"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 border-growth">
            <Sparkles className="h-4 w-4 mr-2 text-growth" />
            Simple Process
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            How It
            <span className="text-transparent bg-gradient-hero bg-clip-text"> Works</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Getting started with sustainable farming gamification is easier than you think. 
            Follow these simple steps to begin your eco-friendly adventure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-8 text-center border-none shadow-natural hover:shadow-elevated transition-all duration-300 hover:scale-105 group h-full">
                <div className="relative mb-6">
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge variant="secondary" className="absolute -top-2 -right-2 w-8 h-8 rounded-full p-0 flex items-center justify-center text-xs font-bold">
                    {step.step}
                  </Badge>
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button variant="growth" size="lg" className="group">
            Start Your Farming Quest Today
            <Trophy className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;