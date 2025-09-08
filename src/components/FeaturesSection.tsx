import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Target, 
  BarChart3, 
  Leaf, 
  Zap, 
  Globe,
  Gamepad2,
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import gamificationImage from "@/assets/gamification-elements.jpg";

const FeaturesSection = () => {
  const features = [
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Unlock badges and trophies as you implement sustainable practices and reach farming milestones.",
      color: "text-harvest"
    },
    {
      icon: Target,
      title: "Smart Goals",
      description: "Set and track personalized sustainability goals with AI-powered recommendations.",
      color: "text-growth",
      goals: [
        "Reduce water usage by 25% through drip irrigation",
        "Increase soil carbon sequestration by 15%",
        "Implement integrated pest management systems",
        "Achieve 90% renewable energy usage on farm",
        "Reduce chemical fertilizer use by 40%",
        "Establish pollinator-friendly habitat zones",
        "Minimize food waste to under 5%",
        "Convert 50% of farm to organic practices",
        "Implement crop rotation for soil health",
        "Reduce greenhouse gas emissions by 30%",
        "Create composting system for organic waste",
        "Install rainwater harvesting infrastructure",
        "Adopt precision agriculture techniques",
        "Establish biodiversity monitoring program",
        "Achieve carbon-neutral farming operations"
      ]
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description: "Visualize your environmental impact with detailed charts and progress tracking.",
      color: "text-sky"
    },
    {
      icon: Gamepad2,
      title: "Challenge Quests",
      description: "Complete daily and weekly challenges to boost your farm's sustainability score.",
      color: "text-leaf"
    },
    {
      icon: Globe,
      title: "Community Hub",
      description: "Connect with fellow farmers, share experiences, and participate in global challenges.",
      color: "text-earth"
    },
    {
      icon: TrendingUp,
      title: "Impact Rewards",
      description: "Earn points and unlock exclusive content based on your environmental contributions.",
      color: "text-primary"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            <Zap className="h-4 w-4 mr-2" />
            Game-Changing Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Level Up Your
            <span className="text-transparent bg-gradient-earth bg-clip-text"> Farming Game</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how our gamification platform transforms sustainable farming into an engaging, 
            rewarding journey that benefits both you and the planet.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={gamificationImage}
              alt="Gamification elements for sustainable farming"
              className="w-full h-[500px] object-cover rounded-2xl shadow-elevated"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-growth/20 to-transparent rounded-2xl" />
          </div>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`p-6 border-none shadow-natural hover:shadow-elevated transition-all duration-300 hover:scale-105 group ${
                  feature.title === "Smart Goals" || feature.title === "Progress Analytics" || feature.title === "Challenge Quests" || feature.title === "Community Hub" ? "cursor-pointer" : ""
                }`}
              >
                {feature.title === "Smart Goals" ? (
                  <Link to="/goals" className="block">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors`}>
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {feature.title}
                          </h3>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {feature.description}
                        </p>
                        {feature.goals && (
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-foreground mb-3">
                              Example Sustainable Goals:
                            </h4>
                            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto pr-2">
                              {feature.goals.slice(0, 6).map((goal, goalIndex) => (
                                <div 
                                  key={goalIndex}
                                  className="flex items-center space-x-2 text-sm text-muted-foreground"
                                >
                                  <div className="h-1.5 w-1.5 rounded-full bg-growth flex-shrink-0" />
                                  <span className="leading-tight">{goal}</span>
                                </div>
                              ))}
                              {feature.goals.length > 6 && (
                                <div className="text-xs text-primary font-medium mt-1">
                                  Click to view all {feature.goals.length} goals →
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ) : feature.title === "Progress Analytics" ? (
                  <Link to="/learn" className="block">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors`}>
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {feature.title}
                          </h3>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {feature.description}
                        </p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground mb-3">
                            Available Analytics:
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                              <span className="leading-tight">Sustainability score breakdown</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-growth flex-shrink-0" />
                              <span className="leading-tight">Weekly & monthly trend charts</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                              <span className="leading-tight">Environmental impact metrics</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-harvest flex-shrink-0" />
                              <span className="leading-tight">Target vs actual comparisons</span>
                            </div>
                            <div className="text-xs text-primary font-medium mt-1">
                              Click to view detailed analytics →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : feature.title === "Challenge Quests" ? (
                  <Link to="/learn" className="block">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors`}>
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {feature.title}
                          </h3>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {feature.description}
                        </p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground mb-3">
                            Quest Types Available:
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                              <span className="leading-tight">Story-driven daily challenges</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-growth flex-shrink-0" />
                              <span className="leading-tight">Personalized weekly goals</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                              <span className="leading-tight">Mystery challenges with rewards</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-harvest flex-shrink-0" />
                              <span className="leading-tight">Streak tracking & eco-impact visuals</span>
                            </div>
                            <div className="text-xs text-primary font-medium mt-1">
                              Click to start your quest journey →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : feature.title === "Community Hub" ? (
                  <Link to="/community" className="block">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors`}>
                        <feature.icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-semibold text-foreground">
                            {feature.title}
                          </h3>
                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {feature.description}
                        </p>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground mb-3">
                            Community Features:
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                              <span className="leading-tight">Join local farming pods</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-growth flex-shrink-0" />
                              <span className="leading-tight">Share crop photos & tips</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                              <span className="leading-tight">Ask experts & participate in Q&A</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 rounded-full bg-harvest flex-shrink-0" />
                              <span className="leading-tight">Trade seeds & resources</span>
                            </div>
                            <div className="text-xs text-primary font-medium mt-1">
                              Click to join the community →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-muted/50 group-hover:bg-muted transition-colors`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      {feature.goals && (
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-foreground mb-3">
                            Example Sustainable Goals:
                          </h4>
                          <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto pr-2">
                            {feature.goals.slice(0, 6).map((goal, goalIndex) => (
                              <div 
                                key={goalIndex}
                                className="flex items-center space-x-2 text-sm text-muted-foreground"
                              >
                                <div className="h-1.5 w-1.5 rounded-full bg-growth flex-shrink-0" />
                                <span className="leading-tight">{goal}</span>
                              </div>
                            ))}
                            {feature.goals.length > 6 && (
                              <div className="text-xs text-muted-foreground/70 mt-1">
                                +{feature.goals.length - 6} more goals available
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;