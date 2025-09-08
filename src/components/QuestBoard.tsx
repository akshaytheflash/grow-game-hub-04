import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Droplets, 
  Leaf, 
  Zap, 
  Bug, 
  Recycle,
  Sprout,
  Sun,
  ShieldCheck,
  BarChart3,
  Trophy,
  Flame,
  Star,
  Gift,
  Coins,
  Info
} from "lucide-react";
import { toast } from "sonner";
import { useProfile } from "@/hooks/useProfile";
import { useQuests } from "@/hooks/useQuests";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GovernmentSchemesEligibility from "./GovernmentSchemesEligibility";

// Icon mapping for quest icons
const iconMap: Record<string, React.ComponentType<any>> = {
  'Droplets': Droplets,
  'Leaf': Leaf,
  'Zap': Zap,
  'Bug': Bug,
  'Recycle': Recycle,
  'Sprout': Sprout,
  'Sun': Sun,
  'ShieldCheck': ShieldCheck,
  'BarChart3': BarChart3,
  'Trophy': Trophy
};

const QuestBoard = () => {
  const { user } = useAuth();
  const { profile, loading: profileLoading, refetch: refetchProfile } = useProfile();
  const { getDailyQuests, getWeeklyQuests, completeQuest, loading: questsLoading } = useQuests();
  const [streak, setStreak] = useState(7);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState<string | null>(null);

  // If user is not logged in, show auth prompt
  if (!user) {
    return (
      <div className="space-y-6">
        <Card className="border-none shadow-natural">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Login Required</h2>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to access quests and earn credits.
            </p>
            <Button asChild>
              <Link to="/auth">Login / Sign Up</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const dailyQuests = getDailyQuests();
  const weeklyQuests = getWeeklyQuests();
  
  const allQuests = [...dailyQuests, ...weeklyQuests];
  const totalPoints = allQuests.reduce((sum, quest) => quest.completed ? sum + quest.points : sum, 0);

  const handleQuestComplete = async (questId: string, emoji: string) => {
    setShowCompletionAnimation(emoji);
    setTimeout(() => setShowCompletionAnimation(null), 2000);
    
    await completeQuest(questId);
    
    // Refresh profile to get updated credits
    refetchProfile();

    // Check for weekly completion badge
    const weeklyCompletedCount = weeklyQuests.filter(q => q.completed || q.id === questId).length;
    if (weeklyCompletedCount === weeklyQuests.length) {
      setTimeout(() => {
        toast.success("🏆 Weekly Champion! Badge unlocked!");
      }, 1000);
    }
  };

  const getCompletionProgress = (quests: any[]) => {
    const completed = quests.filter(q => q.completed).length;
    return quests.length > 0 ? (completed / quests.length) * 100 : 0;
  };

  const CompletionAnimation = ({ emoji }: { emoji: string }) => (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-8 rounded-2xl shadow-elevated border animate-scale-in">
        <div className="text-center">
          <div className="text-6xl animate-bounce mb-4">{emoji}</div>
          <div className="text-xl font-bold text-primary">Quest Completed!</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Credits Display - Top Left */}
      <div className="flex justify-between items-start">
        <Card className="border-none shadow-natural bg-gradient-to-br from-green-500/10 to-emerald-500/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <Coins className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Credits</p>
                <p className="text-2xl font-bold text-green-600">
                  {profileLoading ? "..." : (profile?.credits ?? 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Government Schemes Eligibility */}
      <GovernmentSchemesEligibility credits={profile?.credits ?? 0} />

      {/* Notice Box - Only show if credits < 100 */}
      {(profile?.credits ?? 0) < 100 && (
        <Alert className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700 dark:text-blue-300">
            Earn 100 credits to unlock government schemes with discounts
          </AlertDescription>
        </Alert>
      )}

      {/* Quest Board Header */}
      <Card className="border-none shadow-natural bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-6 w-6 text-accent" />
              <span>Quest Board</span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Flame className="h-3 w-3 mr-1" />
                {streak} day streak
              </Badge>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                <Star className="h-3 w-3 mr-1" />
                {totalPoints} points
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Quest Sections */}
      {questsLoading ? (
        <Card className="border-none shadow-natural">
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">Loading quests...</div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Daily Quests */}
          {dailyQuests.length > 0 && (
            <Card className="border-none shadow-natural">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Sun className="h-5 w-5 text-primary" />
                    <span>Daily Quests</span>
                    <Badge variant="secondary">
                      {dailyQuests.filter(q => q.completed).length}/{dailyQuests.length}
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center space-x-2 min-w-[120px]">
                    <Progress value={getCompletionProgress(dailyQuests)} className="flex-1" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {Math.round(getCompletionProgress(dailyQuests))}%
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {dailyQuests.map((quest) => {
                  const IconComponent = quest.icon ? iconMap[quest.icon] || Trophy : Trophy;
                  return (
                    <div 
                      key={quest.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                        quest.completed 
                          ? 'bg-growth/10 border-growth/20' 
                          : 'bg-card hover:bg-muted/30 border-border hover:border-primary/30'
                      }`}
                    >
                      <Checkbox
                        checked={quest.completed}
                        onCheckedChange={() => !quest.completed && handleQuestComplete(quest.id, quest.emoji || "🎉")}
                        className="data-[state=checked]:bg-growth data-[state=checked]:border-growth"
                      />
                      <div className={`p-2 rounded-lg ${quest.completed ? 'bg-growth/20' : 'bg-muted/50'}`}>
                        <IconComponent 
                          className={`h-4 w-4 ${quest.completed ? 'text-growth' : 'text-muted-foreground'}`} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${quest.completed ? 'text-growth line-through' : 'text-foreground'}`}>
                            {quest.emoji} {quest.title}
                          </span>
                          <Badge 
                            variant={quest.completed ? "default" : "secondary"}
                            className={quest.completed ? "bg-growth/10 text-growth" : ""}
                          >
                            +5 credits
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Weekly Quests */}
          {weeklyQuests.length > 0 && (
            <Card className="border-none shadow-natural">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-growth" />
                    <span>Weekly Quests</span>
                    <Badge variant="secondary">
                      {weeklyQuests.filter(q => q.completed).length}/{weeklyQuests.length}
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center space-x-2 min-w-[120px]">
                    <Progress value={getCompletionProgress(weeklyQuests)} className="flex-1" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {Math.round(getCompletionProgress(weeklyQuests))}%
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {weeklyQuests.map((quest) => {
                  const IconComponent = quest.icon ? iconMap[quest.icon] || Trophy : Trophy;
                  return (
                    <div 
                      key={quest.id}
                      className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                        quest.completed 
                          ? 'bg-growth/10 border-growth/20' 
                          : 'bg-card hover:bg-muted/30 border-border hover:border-primary/30'
                      }`}
                    >
                      <Checkbox
                        checked={quest.completed}
                        onCheckedChange={() => !quest.completed && handleQuestComplete(quest.id, quest.emoji || "🎉")}
                        className="data-[state=checked]:bg-growth data-[state=checked]:border-growth"
                      />
                      <div className={`p-2 rounded-lg ${quest.completed ? 'bg-growth/20' : 'bg-muted/50'}`}>
                        <IconComponent 
                          className={`h-4 w-4 ${quest.completed ? 'text-growth' : 'text-muted-foreground'}`} 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className={`font-medium ${quest.completed ? 'text-growth line-through' : 'text-foreground'}`}>
                            {quest.emoji} {quest.title}
                          </span>
                          <Badge 
                            variant={quest.completed ? "default" : "secondary"}
                            className={quest.completed ? "bg-growth/10 text-growth" : ""}
                          >
                            +5 credits
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Mystery Quest Unlock */}
      {streak >= 7 && (
        <Card className="border-none shadow-natural bg-gradient-to-br from-accent/10 to-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-accent/20">
                <Gift className="h-6 w-6 text-accent animate-pulse" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Mystery Quest Unlocked!</h3>
                <p className="text-sm text-muted-foreground">
                  🎉 Your 7-day streak has unlocked a special mystery quest with exclusive rewards!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completion Animation */}
      {showCompletionAnimation && <CompletionAnimation emoji={showCompletionAnimation} />}
    </div>
  );
};

export default QuestBoard;