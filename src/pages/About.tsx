import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Users, Target, Heart, Globe, Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              <Leaf className="h-4 w-4 mr-2" />
              About KrishiKhel
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Empowering Farmers for a 
              <span className="text-gradient bg-gradient-hero bg-clip-text text-transparent"> Sustainable Future</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              KrishiKhel is revolutionizing agriculture through gamification, community building, and sustainable farming practices. Join thousands of farmers on their journey to transform agriculture.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="border-none shadow-natural">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Target className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Our Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    To make sustainable farming accessible, engaging, and rewarding for farmers worldwide. We believe that through gamification and community support, we can accelerate the adoption of environmentally friendly agricultural practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-natural">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 rounded-lg bg-growth/10">
                      <Globe className="h-6 w-6 text-growth" />
                    </div>
                    <CardTitle className="text-2xl">Our Vision</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    A world where every farmer has the tools, knowledge, and community support needed to implement sustainable practices that benefit both their livelihood and the planet.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The principles that guide our mission to transform agriculture
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="border-none shadow-natural text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-xl bg-green-500/10 w-fit mb-4">
                    <Sprout className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Sustainability</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Promoting practices that preserve our planet for future generations while maintaining profitable farming operations.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-natural text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-xl bg-blue-500/10 w-fit mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Building connections between farmers worldwide to share knowledge, support each other, and grow together.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-natural text-center">
                <CardHeader>
                  <div className="mx-auto p-3 rounded-xl bg-purple-500/10 w-fit mb-4">
                    <Heart className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Leveraging technology and gamification to make learning and implementing sustainable practices engaging and fun.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Impact</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Together, we're making a real difference in sustainable agriculture
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { number: "10K+", label: "Active Farmers" },
                { number: "25K", label: "Sustainable Practices Adopted" },
                { number: "500+", label: "Communities Formed" },
                { number: "1M+", label: "Liters of Water Saved" }
              ].map((stat, index) => (
                <Card key={index} className="border-none shadow-natural text-center">
                  <CardContent className="pt-6">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Join the Movement?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start your sustainable farming journey today and be part of the agricultural revolution.
            </p>
            <div className="space-x-4">
              <Button size="lg" asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/community">Join Community</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
