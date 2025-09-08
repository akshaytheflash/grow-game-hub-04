import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import BackButton from "@/components/BackButton";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Trophy, 
  Clock, 
  CheckCircle, 
  Lock,
  Star,
  Target,
  Award,
  Brain,
  Gamepad2,
  Droplets,
  Play
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate, Link } from "react-router-dom";
import ChapterTest from "@/components/ChapterTest";
import TextToSpeech from "@/components/TextToSpeech";

import QuestBoard from "@/components/QuestBoard";

interface Chapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
}

interface Lesson {
  id: string;
  chapter_id: string;
  title: string;
  content: string;
  order_index: number;
  duration_minutes: number;
}

interface ChapterBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface UserProgress {
  lesson_id: string;
  completed_at: string;
}

interface UserBadge {
  badge_id: string;
  earned_at: string;
}

const Learn = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
  const [badges, setBadges] = useState<Record<string, ChapterBadge>>({});
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showTest, setShowTest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchData();
  }, [user, navigate]);


  const fetchData = async () => {
    try {
      // Fetch chapters
      const { data: chaptersData, error: chaptersError } = await supabase
        .from('chapters')
        .select('*')
        .order('order_index');

      if (chaptersError) throw chaptersError;

      // Fetch lessons
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .order('order_index');

      if (lessonsError) throw lessonsError;

      // Fetch badges
      const { data: badgesData, error: badgesError } = await supabase
        .from('badges')
        .select('*');

      if (badgesError) throw badgesError;

      // Fetch user progress if authenticated
      let progressData = [];
      let userBadgesData = [];
      if (user) {
        const { data: progress } = await supabase
          .from('user_lesson_progress')
          .select('lesson_id, completed_at')
          .eq('user_id', user.id);

        const { data: badges } = await supabase
          .from('user_badges')
          .select('badge_id, earned_at')
          .eq('user_id', user.id);

        progressData = progress || [];
        userBadgesData = badges || [];
      }

      // Group lessons by chapter
      const lessonsByChapter: Record<string, Lesson[]> = {};
      lessonsData?.forEach(lesson => {
        if (!lessonsByChapter[lesson.chapter_id]) {
          lessonsByChapter[lesson.chapter_id] = [];
        }
        lessonsByChapter[lesson.chapter_id].push(lesson);
      });

      // Group badges by chapter
      const badgesByChapter: Record<string, ChapterBadge> = {};
      badgesData?.forEach(badge => {
        badgesByChapter[badge.chapter_id] = badge;
      });

      setChapters(chaptersData || []);
      setLessons(lessonsByChapter);
      setBadges(badgesByChapter);
      setUserProgress(progressData);
      setUserBadges(userBadgesData);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load learning content",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: string, chapterId: string) => {
    if (!user) return;

    try {
      // Mark lesson as complete
      const { error } = await supabase
        .from('user_lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId
        });

      if (error) throw error;

      // Update local state
      const newProgress = [...userProgress, { lesson_id: lessonId, completed_at: new Date().toISOString() }];
      setUserProgress(newProgress);

      // Check if all lessons in chapter are complete
      const chapterLessons = lessons[chapterId] || [];
      const completedChapterLessons = newProgress.filter(p => 
        chapterLessons.some(l => l.id === p.lesson_id)
      );

      if (completedChapterLessons.length === chapterLessons.length && badges[chapterId]) {
        // Award badge if not already earned
        const hasBadge = userBadges.some(ub => ub.badge_id === badges[chapterId].id);
        if (!hasBadge) {
          const { error: badgeError } = await supabase
            .from('user_badges')
            .insert({
              user_id: user.id,
              badge_id: badges[chapterId].id
            });

          if (!badgeError) {
            setUserBadges([...userBadges, { badge_id: badges[chapterId].id, earned_at: new Date().toISOString() }]);
            toast({
              title: "Badge Earned! 🏆",
              description: `Congratulations! You've earned the "${badges[chapterId].name}" badge!`
            });
          }
        }
      }

      toast({
        title: "Lesson Complete!",
        description: "Great job! Keep learning."
      });
    } catch (error) {
      console.error('Error marking lesson complete:', error);
      toast({
        title: "Error",
        description: "Failed to save progress",
        variant: "destructive"
      });
    }
  };

  const getChapterProgress = (chapterId: string) => {
    const chapterLessons = lessons[chapterId] || [];
    const completedLessons = userProgress.filter(p => 
      chapterLessons.some(l => l.id === p.lesson_id)
    );
    return chapterLessons.length > 0 ? (completedLessons.length / chapterLessons.length) * 100 : 0;
  };

  const isLessonComplete = (lessonId: string) => {
    return userProgress.some(p => p.lesson_id === lessonId);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      droplets: "💧",
      recycle: "♻️",
      leaf: "🌱",
      bug: "🐛",
      mountain: "⛰️"
    };
    return iconMap[iconName] || "📚";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading learning content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BackButton />
      {/* Header */}
      <div className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Sustainable Farming Academy</h1>
            <p className="text-xl opacity-90">Master eco-friendly farming through interactive learning</p>
          </div>

          {/* User badges */}
          {userBadges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {userBadges.map(userBadge => {
                const badge = Object.values(badges).find(b => b.id === userBadge.badge_id);
                return badge ? (
                  <Badge key={badge.id} variant="secondary" className="text-lg px-4 py-2">
                    <Trophy className="h-5 w-5 mr-2" />
                    {badge.name}
                  </Badge>
                ) : null;
              })}
            </div>
          )}

          {/* Overall progress */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm">
                {Math.round(chapters.reduce((acc, chapter) => acc + getChapterProgress(chapter.id), 0) / chapters.length)}%
              </span>
            </div>
            <Progress 
              value={chapters.reduce((acc, chapter) => acc + getChapterProgress(chapter.id), 0) / chapters.length} 
              className="bg-white/20"
            />
          </div>

        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={selectedChapter || "overview"} onValueChange={setSelectedChapter}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-7 gap-1 h-auto p-1 mb-8">
            <TabsTrigger value="overview" className="flex items-center justify-center gap-1 p-2 h-auto min-h-[40px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="quests" className="flex items-center justify-center gap-1 p-2 h-auto min-h-[40px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Gamepad2 className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Quests</span>
            </TabsTrigger>
            {chapters.map(chapter => (
              <TabsTrigger key={chapter.id} value={chapter.id} className="flex items-center justify-center gap-1 p-2 h-auto min-h-[40px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <span className="text-lg">{getIconComponent(chapter.icon)}</span>
                <span className="hidden md:inline truncate">{chapter.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-8">

              {/* Chapter Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chapters.map(chapter => {
                  const progress = getChapterProgress(chapter.id);
                  const isComplete = progress === 100;
                  const badge = badges[chapter.id];
                  const hasBadge = badge && userBadges.some(ub => ub.badge_id === badge.id);

                  return (
                    <Card key={chapter.id} className="p-6 hover:shadow-elevated transition-all duration-300">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-3xl">{getIconComponent(chapter.icon)}</div>
                        {hasBadge && (
                          <Badge variant="secondary" className="bg-harvest text-black">
                            <Award className="h-4 w-4 mr-1" />
                            {badge.name}
                          </Badge>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{chapter.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">{chapter.description}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-1" />
                            {lessons[chapter.id]?.length || 0} lessons
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {lessons[chapter.id]?.reduce((acc, lesson) => acc + lesson.duration_minutes, 0) || 0} min
                          </span>
                        </div>
                      </div>

                      <Button 
                        onClick={() => setSelectedChapter(chapter.id)}
                        className="w-full mt-4"
                        variant={isComplete ? "secondary" : "default"}
                      >
                        {isComplete ? "Review Lessons" : "Start Learning"}
                      </Button>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="quests">
            <QuestBoard />
          </TabsContent>

          {chapters.map(chapter => (
            <TabsContent key={chapter.id} value={chapter.id}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Lessons List */}
                <div className="lg:col-span-1">
                  <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <span className="text-2xl mr-2">{getIconComponent(chapter.icon)}</span>
                      {chapter.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{chapter.description}</p>
                    
                    {/* Chapter Progress */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm">{Math.round(getChapterProgress(chapter.id))}%</span>
                      </div>
                      <Progress value={getChapterProgress(chapter.id)} className="mb-4" />
                      
                      {/* Test Button - appears when chapter is 100% complete */}
                      {getChapterProgress(chapter.id) === 100 && (
                        <Button
                          variant="secondary"
                          className="w-full mb-4"
                          onClick={() => {
                            setShowTest(true);
                            setSelectedLesson(null);
                          }}
                        >
                          <Brain className="h-4 w-4 mr-2" />
                          Take Chapter Test
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">
                        👆 Click on any lesson below to start learning
                      </div>
                      {lessons[chapter.id]?.map((lesson, index) => {
                        const isComplete = isLessonComplete(lesson.id);
                        const isLocked = index > 0 && !isLessonComplete(lessons[chapter.id][index - 1].id);
                        
                        return (
                          <Button
                            key={lesson.id}
                            variant={selectedLesson?.id === lesson.id ? "default" : "outline"}
                            className={`w-full justify-start h-auto p-4 transition-all duration-200 ${
                              selectedLesson?.id === lesson.id 
                                ? "ring-2 ring-primary/50 shadow-lg" 
                                : "hover:shadow-md hover:scale-[1.02]"
                            }`}
                            onClick={() => {
                              if (!isLocked) {
                                setSelectedLesson(lesson);
                                setShowTest(false);
                              }
                            }}
                            disabled={isLocked}
                          >
                            <div className="flex items-center w-full">
                              <div className="mr-3">
                                {isComplete ? (
                                  <CheckCircle className="h-5 w-5 text-growth" />
                                ) : isLocked ? (
                                  <Lock className="h-5 w-5 text-muted-foreground" />
                                ) : (
                                  <BookOpen className="h-5 w-5 text-primary" />
                                )}
                              </div>
                              <div className="flex-1 text-left min-w-0">
                                <div className="font-medium text-sm truncate">{lesson.title}</div>
                                <div className="text-xs text-muted-foreground flex items-center mt-1">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {lesson.duration_minutes} min
                                  {!isLocked && !selectedLesson && index === 0 && (
                                    <span className="ml-2 text-primary font-medium">← Start here!</span>
                                  )}
                                </div>
                              </div>
                              {!isLocked && (
                                <div className="ml-2 text-xs text-primary whitespace-nowrap">
                                  →
                                </div>
                              )}
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </Card>
                </div>

                {/* Content Area - Test or Lesson */}
                <div className="lg:col-span-2">
                  {showTest ? (
                    <ChapterTest 
                      chapterId={chapter.id} 
                      chapterTitle={chapter.title}
                    />
                  ) : selectedLesson ? (
                    <Card className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold mb-2">{selectedLesson.title}</h2>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="h-4 w-4 mr-2" />
                              {selectedLesson.duration_minutes} minutes
                            </div>
                            {selectedLesson.content && (
                              <TextToSpeech 
                                text={selectedLesson.content} 
                                className="ml-4"
                              />
                            )}
                          </div>
                        </div>
                        {isLessonComplete(selectedLesson.id) && (
                          <Badge variant="secondary" className="bg-growth text-white ml-4">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Complete
                          </Badge>
                        )}
                      </div>

                      <div className="prose max-w-none mb-8">
                        <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                          {selectedLesson.content ? selectedLesson.content : (
                            <div className="text-center py-8 text-muted-foreground">
                              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                              <p>This lesson content is currently being prepared.</p>
                              <p className="text-sm mt-2">Please check back soon or contact support if this issue persists.</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {!isLessonComplete(selectedLesson.id) && (
                        <Button 
                          onClick={() => markLessonComplete(selectedLesson.id, chapter.id)}
                          className="w-full"
                          size="lg"
                        >
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Mark as Complete
                        </Button>
                      )}
                    </Card>
                  ) : (
                    <div className="space-y-6">
                      {/* Interactive Games Section - Show for sustainable irrigation */}
                      {(chapter.title.toLowerCase().includes('irrigation') || 
                        chapter.title.toLowerCase().includes('water') || 
                        chapter.icon === "droplets") && (
                        <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50 border-blue-200">
                          <div className="flex items-center mb-4">
                            <Droplets className="h-6 w-6 text-blue-600 mr-2" />
                            <h3 className="text-xl font-semibold text-foreground">Interactive Learning</h3>
                          </div>
                          <p className="text-muted-foreground mb-4">
                            Master sustainable irrigation through hands-on gameplay
                          </p>
                          <div className="grid gap-4">
                            <Card className="p-4 bg-white border hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="p-2 rounded-lg bg-blue-100 mr-3">
                                    <Gamepad2 className="h-5 w-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-foreground">Drip Irrigation Challenge</h4>
                                    <p className="text-sm text-muted-foreground">Learn water-efficient farming through gameplay</p>
                                  </div>
                                </div>
                                <Button asChild size="sm">
                                  <Link to="/drip-irrigation-game" className="flex items-center">
                                    <Play className="h-4 w-4 mr-1" />
                                    Play
                                  </Link>
                                </Button>
                              </div>
                            </Card>
                            <Card className="p-4 bg-white border hover:shadow-md transition-shadow">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="p-2 rounded-lg bg-green-100 mr-3">
                                    <Droplets className="h-5 w-5 text-green-600" />
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-foreground">Micro Sprinkler Challenge</h4>
                                    <p className="text-sm text-muted-foreground">Master pressure control and coverage optimization</p>
                                  </div>
                                </div>
                                <Button asChild size="sm">
                                  <Link to="/micro-sprinkler-game" className="flex items-center">
                                    <Play className="h-4 w-4 mr-1" />
                                    Play
                                  </Link>
                                </Button>
                              </div>
                            </Card>
                          </div>
                        </Card>
                      )}
                      
                      <Card className="p-8 text-center">
                        <BookOpen className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                        <h3 className="text-xl font-semibold mb-2">Select a Lesson</h3>
                        <p className="text-muted-foreground">
                          Choose a lesson from the left to start learning
                          {getChapterProgress(chapter.id) === 100 && (
                            <span className="block mt-2 text-primary font-medium">
                              or take the chapter test to prove your mastery! 🧠
                            </span>
                          )}
                        </p>
                      </Card>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;