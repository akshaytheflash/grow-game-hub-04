import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Award, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import heroImage from "@/assets/hero-farming.jpg";

const HeroSection = () => {
  const { user } = useAuth();

  return (
    <section className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-background to-muted relative overflow-hidden">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-grow">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Gamify Your
              <span className="text-transparent bg-gradient-hero bg-clip-text"> Sustainable </span>
              Farming Journey
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Transform your farm into an eco-friendly powerhouse with our gamified platform. 
              Earn rewards, track progress, and connect with fellow sustainable farmers worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="group" asChild>
              <Link to={user ? "/learn" : "/auth"}>
                {user ? "Continue Your Quest" : "Start Your Quest"}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8">
            <Card className="p-6 text-center bg-card/50 backdrop-blur border-none shadow-natural">
              <Users className="h-8 w-8 text-growth mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">10K+</div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </Card>
            <Card className="p-6 text-center bg-card/50 backdrop-blur border-none shadow-natural">
              <Award className="h-8 w-8 text-harvest mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">500+</div>
              <div className="text-sm text-muted-foreground">Achievements</div>
            </Card>
            <Card className="p-6 text-center bg-card/50 backdrop-blur border-none shadow-natural">
              <TrendingUp className="h-8 w-8 text-sky mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">25%</div>
              <div className="text-sm text-muted-foreground">Avg. Yield Increase</div>
            </Card>
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-2xl shadow-elevated animate-float">
            <img
              src={heroImage}
              alt="Sustainable farming with modern technology"
              className="w-full h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          </div>
          
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-harvest rounded-full opacity-20 animate-pulse" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-growth rounded-full opacity-15 animate-pulse delay-1000" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;