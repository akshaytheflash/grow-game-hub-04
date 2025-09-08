import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AskQuestionDialog from "./AskQuestionDialog";
import { useCommunity } from "@/hooks/useCommunity";
import { useAuth } from "@/hooks/useAuth";
import { toast } from 'sonner';
import { 
  Calendar, 
  Clock, 
  Users, 
  Video, 
  MessageCircle,
  Star,
  MapPin,
  Leaf,
  GraduationCap,
  Bell
} from "lucide-react";

interface ExpertSession {
  id: string;
  expert: {
    name: string;
    avatar: string;
    specialty: string;
    rating: number;
    location: string;
    verified: boolean;
  };
  title: string;
  description: string;
  cropFocus: string;
  scheduledAt: string;
  duration: number;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'live' | 'completed';
  tags: string[];
}

interface Question {
  id: string;
  user: string;
  question: string;
  upvotes: number;
  timestamp: string;
  answered: boolean;
}

const ExpertSessions = () => {
  const { user } = useAuth();
  const { getExpertSessions, askExpertQuestion } = useCommunity();
  const [sessions, setSessions] = useState<any[]>([]);
  const [askQuestionOpen, setAskQuestionOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const data = await getExpertSessions();
      setSessions(data);
    } catch (error) {
      toast.error('Failed to load expert sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = (sessionId?: string) => {
    if (!user) {
      toast.error('Please sign in to ask a question');
      return;
    }
    setSelectedSessionId(sessionId);
    setAskQuestionOpen(true);
  };

  const handleQuestionSubmitted = () => {
    toast.success('Your question has been submitted to our experts!');
  };

  const handleRegister = (sessionId: string) => {
    if (!user) {
      toast.error('Please sign in to register for sessions');
      return;
    }
    toast.success('Registration feature coming soon!');
  };

  const handleJoinLive = () => {
    if (!user) {
      toast.error('Please sign in to join live sessions');
      return;
    }
    toast.success('Live session feature coming soon!');
  };

  const handleRequestSession = () => {
    if (!user) {
      toast.error('Please sign in to request sessions');
      return;
    }
    toast.success('Session request feature coming soon!');
  };
  const upcomingSessions: ExpertSession[] = [
    {
      id: "1",
      expert: {
        name: "Dr. Rajesh Kumar",
        avatar: "RK",
        specialty: "Soil Health Specialist",
        rating: 4.8,
        location: "IARI, New Delhi",
        verified: true
      },
      title: "Soil Testing and Nutrient Management",
      description: "Learn how to conduct soil tests and create effective nutrient management plans for better crop yields.",
      cropFocus: "All Crops",
      scheduledAt: "Tomorrow, 2:00 PM",
      duration: 60,
      maxParticipants: 50,
      currentParticipants: 32,
      status: "upcoming",
      tags: ["soil-health", "nutrition", "testing"]
    },
    {
      id: "2",
      expert: {
        name: "Prof. Priya Sharma",
        avatar: "PS",
        specialty: "Organic Farming Expert",
        rating: 4.9,
        location: "Punjab Agricultural University",
        verified: true
      },
      title: "Organic Pest Control Methods",
      description: "Natural and effective ways to control pests without harmful chemicals.",
      cropFocus: "Vegetables",
      scheduledAt: "Friday, 4:00 PM",
      duration: 45,
      maxParticipants: 40,
      currentParticipants: 18,
      status: "upcoming",
      tags: ["organic", "pest-control", "vegetables"]
    },
    {
      id: "3",
      expert: {
        name: "Eng. Suresh Patel",
        avatar: "SP",
        specialty: "Irrigation Technology",
        rating: 4.7,
        location: "Gujarat",
        verified: true
      },
      title: "Drip Irrigation Setup & Maintenance",
      description: "Complete guide to setting up and maintaining drip irrigation systems for maximum efficiency.",
      cropFocus: "Fruit Trees",
      scheduledAt: "Saturday, 10:00 AM",
      duration: 90,
      maxParticipants: 30,
      currentParticipants: 25,
      status: "upcoming",
      tags: ["drip-irrigation", "water-management", "efficiency"]
    }
  ];

  const popularQuestions: Question[] = [
    {
      id: "1",
      user: "Farmer Anita",
      question: "What's the best time to test soil pH levels?",
      upvotes: 23,
      timestamp: "2 hours ago",
      answered: false
    },
    {
      id: "2",
      user: "Ravi Kumar",
      question: "How to identify nutrient deficiency in tomato plants?",
      upvotes: 18,
      timestamp: "4 hours ago",
      answered: true
    },
    {
      id: "3",
      user: "Singh Farm",
      question: "Organic alternatives to chemical pesticides for wheat?",
      upvotes: 15,
      timestamp: "6 hours ago",
      answered: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500';
      case 'upcoming': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Expert Sessions</h2>
          <p className="text-sm text-muted-foreground">Learn from agricultural experts and get your questions answered</p>
        </div>
        <Button onClick={handleRequestSession}>
          <Bell className="w-4 h-4 mr-2" />
          Request Session
        </Button>
      </div>

      {/* Live Session Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <h4 className="font-medium text-sm">Live Session: Water Management Q&A</h4>
              <p className="text-xs text-muted-foreground">Dr. Anjali Mehta • 23 participants</p>
            </div>
            <Button size="sm" className="bg-red-500 hover:bg-red-600" onClick={handleJoinLive}>
              <Video className="w-4 h-4 mr-2" />
              Join Live
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Sessions */}
      <div className="space-y-4">
        <h3 className="font-semibold">Upcoming Sessions</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sessions.map((session) => (
            <Card key={session.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          EX
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Expert</h4>
                      <p className="text-xs text-muted-foreground">Agricultural Expert</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-muted-foreground">4.8</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Expert</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm mb-1">{session.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{session.description}</p>
                  <Badge variant="outline" className="text-xs">
                    <Leaf className="w-3 h-3 mr-1" />
                    {session.crop_focus || 'All Crops'}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(session.scheduled_at).toLocaleDateString()}</span>
                    <Clock className="w-3 h-3 ml-2" />
                    <span>{session.duration_minutes} minutes</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{session.current_participants}/{session.max_participants} registered</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-muted-foreground capitalize">{session.status}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <Button variant="ghost" size="sm" onClick={() => handleAskQuestion(session.id)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Ask Question
                  </Button>
                  <Button size="sm" onClick={() => handleRegister(session.id)}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Register
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Popular Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Popular Questions</span>
            <Button variant="ghost" size="sm" onClick={() => handleAskQuestion()}>
              <GraduationCap className="w-4 h-4 mr-2" />
              Ask Expert
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
            {/* Remove the mock questions and just show the form to ask */}
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Have a farming question? Ask our experts!</p>
              <Button onClick={() => handleAskQuestion()}>
                <GraduationCap className="w-4 h-4 mr-2" />
                Ask Your Question
              </Button>
            </div>
        </CardContent>
      </Card>

      <AskQuestionDialog 
        open={askQuestionOpen} 
        onOpenChange={setAskQuestionOpen}
        sessionId={selectedSessionId}
        onQuestionSubmitted={handleQuestionSubmitted}
      />
    </div>
  );
};

export default ExpertSessions;