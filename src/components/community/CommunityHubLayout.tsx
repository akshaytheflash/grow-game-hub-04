import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Users2, HelpCircle, ArrowRightLeft, Calendar } from "lucide-react";
import PodsPanel from "./PodsPanel";
import CommunityFeed from "./CommunityFeed";
import QuickActions from "./QuickActions";
import CommunityImpact from "./CommunityImpact";
import ForumSection from "./ForumSection";
import SwapBoard from "./SwapBoard";
import EventsPanel from "./EventsPanel";
import QASection from "./QASection";
import { usePods } from "@/hooks/usePods";
import { useSwapBoard } from "@/hooks/useSwapBoard";
import { useChallenges } from "@/hooks/useChallenges";
import BadgeDisplay from './BadgeDisplay';

const CommunityHubLayout = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const { seedInitialPods } = usePods();
  const { seedInitialListings } = useSwapBoard();
  const { seedInitialChallenges } = useChallenges();

  useEffect(() => {
    // Seed initial data on first load
    const seedData = async () => {
      await Promise.all([
        seedInitialPods(),
        seedInitialListings(),
        seedInitialChallenges(),
      ]);
    };
    seedData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Community Hub</h1>
              <p className="text-muted-foreground">Connect, learn, and grow together</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                <Users className="w-3 h-3 mr-1" />
                2,847 Farmers Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Pods */}
          <div className="lg:col-span-1">
            <PodsPanel />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5 gap-1 h-auto p-1">
                <TabsTrigger value="feed" className="flex items-center justify-center gap-1 p-2 h-auto min-h-[40px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">Feed</span>
                </TabsTrigger>
                <TabsTrigger value="pods" className="flex items-center justify-center gap-1 p-2 h-auto min-h-[40px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Users2 className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">Pods</span>
                </TabsTrigger>
                <TabsTrigger value="qa" className="flex items-center justify-center gap-1 p-2 h-auto min-h-[40px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <HelpCircle className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">Q&A</span>
                </TabsTrigger>
                <TabsTrigger value="swap" className="flex items-center justify-center gap-1 p-2 h-auto min-h-[40px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <ArrowRightLeft className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">Swap</span>
                </TabsTrigger>
                <TabsTrigger value="events" className="flex items-center justify-center gap-1 p-2 h-auto min-h-[40px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">Events</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="feed" className="space-y-4">
                <CommunityFeed />
              </TabsContent>
              
              <TabsContent value="pods" className="space-y-4">
                <ForumSection />
              </TabsContent>
              
              <TabsContent value="qa" className="space-y-4">
                <QASection />
              </TabsContent>
              
              <TabsContent value="swap" className="space-y-4">
                <SwapBoard />
              </TabsContent>
              
              <TabsContent value="events" className="space-y-4">
                <EventsPanel />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            <QuickActions />
            <CommunityImpact />
            <BadgeDisplay />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHubLayout;