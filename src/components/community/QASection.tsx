import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useCommunity } from "@/hooks/useCommunity";
import { Search, ThumbsUp, MessageCircle, CheckCircle, Clock, Plus } from "lucide-react";
import AskQuestionDialog from "./AskQuestionDialog";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Question {
  id: string;
  question: string;
  answer: string | null;
  upvotes: number;
  is_answered: boolean;
  created_at: string;
  answered_at: string | null;
  session_id: string | null;
  user_id: string;
}

const QASection = () => {
  const { user } = useAuth();
  const { loading } = useCommunity();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [showAskDialog, setShowAskDialog] = useState(false);
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all');

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [questions, searchTerm, filter]);

  const loadQuestions = async () => {
    // Mock data for now
    const mockQuestions: Question[] = [
      {
        id: '1',
        question: 'What is the best organic fertilizer for tomatoes in Maharashtra soil?',
        answer: 'For Maharashtra soil, I recommend a combination of well-composted cow manure and neem cake. The clay-rich soil in Maharashtra benefits from organic matter that improves drainage while providing steady nutrition. Apply 2-3 kg of compost per plant during planting, and supplement with liquid organic fertilizer every 2 weeks during growing season.',
        upvotes: 23,
        is_answered: true,
        created_at: '2024-01-10T10:00:00Z',
        answered_at: '2024-01-10T14:30:00Z',
        session_id: null,
        user_id: 'user1'
      },
      {
        id: '2',
        question: 'How do I prevent fungal diseases in my cotton crop during monsoon?',
        answer: null,
        upvotes: 15,
        is_answered: false,
        created_at: '2024-01-12T08:00:00Z',
        answered_at: null,
        session_id: 'session1',
        user_id: 'user2'
      },
      {
        id: '3',
        question: 'What is the optimal spacing for drip irrigation lines in vegetable farming?',
        answer: 'For most vegetables, lateral spacing should be 30-40cm for leafy greens, 60cm for small vegetables like onions, and 90-120cm for larger crops like tomatoes and peppers. Emitter spacing within laterals should be 20-30cm. This ensures uniform water distribution while minimizing water waste.',
        upvotes: 31,
        is_answered: true,
        created_at: '2024-01-08T15:00:00Z',
        answered_at: '2024-01-09T09:15:00Z',
        session_id: null,
        user_id: 'user3'
      },
      {
        id: '4',
        question: 'How can I improve soil health naturally without expensive inputs?',
        answer: null,
        upvotes: 8,
        is_answered: false,
        created_at: '2024-01-13T12:00:00Z',
        answered_at: null,
        session_id: null,
        user_id: 'user4'
      }
    ];
    setQuestions(mockQuestions);
  };

  const filterQuestions = () => {
    let filtered = questions;

    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.answer && q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filter === 'answered') {
      filtered = filtered.filter(q => q.is_answered);
    } else if (filter === 'unanswered') {
      filtered = filtered.filter(q => !q.is_answered);
    }

    // Sort by upvotes and recency
    filtered.sort((a, b) => {
      if (a.is_answered !== b.is_answered) {
        return a.is_answered ? 1 : -1; // Unanswered first
      }
      return b.upvotes - a.upvotes; // Then by upvotes
    });

    setFilteredQuestions(filtered);
  };

  const handleUpvote = (questionId: string) => {
    if (!user) {
      toast.error('Please sign in to upvote questions');
      return;
    }

    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, upvotes: q.upvotes + 1 }
        : q
    ));
    toast.success('Question upvoted!');
  };

  const handleQuestionSubmitted = () => {
    setShowAskDialog(false);
    loadQuestions();
  };

  return (
    <div className="space-y-4">
      {/* Header with Search and Ask Question */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search questions and answers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button onClick={() => setShowAskDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Ask Question
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2">
        {(['all', 'unanswered', 'answered'] as const).map((filterOption) => (
          <Button
            key={filterOption}
            variant={filter === filterOption ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(filterOption)}
          >
            {filterOption === 'all' ? 'All' : filterOption === 'unanswered' ? 'Unanswered' : 'Answered'}
            <Badge variant="secondary" className="ml-2">
              {filterOption === 'all' 
                ? questions.length 
                : filterOption === 'unanswered'
                ? questions.filter(q => !q.is_answered).length
                : questions.filter(q => q.is_answered).length
              }
            </Badge>
          </Button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <CardTitle className="text-base leading-tight">
                    {question.question}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}
                    </div>
                    {question.session_id && (
                      <Badge variant="secondary" className="text-xs">
                        Expert Session
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {question.is_answered && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  <Badge variant={question.is_answered ? 'default' : 'secondary'}>
                    {question.is_answered ? 'Answered' : 'Pending'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              {question.answer && (
                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium">Expert Answer</span>
                    {question.answered_at && (
                      <span className="text-xs text-muted-foreground ml-2">
                        • {formatDistanceToNow(new Date(question.answered_at), { addSuffix: true })}
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{question.answer}</p>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleUpvote(question.id)}
                    disabled={loading}
                    className="h-8 px-2"
                  >
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {question.upvotes}
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 px-2">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Discuss
                  </Button>
                </div>
                
                {!question.is_answered && (
                  <div className="text-xs text-muted-foreground">
                    {question.session_id ? 'Will be answered in next session' : 'Waiting for expert response'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredQuestions.length === 0 && (
          <Card>
            <CardContent className="text-center py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-2 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">
                {searchTerm 
                  ? 'No questions found matching your search' 
                  : filter === 'answered'
                  ? 'No answered questions yet'
                  : filter === 'unanswered'
                  ? 'No pending questions'
                  : 'No questions yet'
                }
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setShowAskDialog(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ask First Question
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <AskQuestionDialog
        open={showAskDialog}
        onOpenChange={setShowAskDialog}
        onQuestionSubmitted={handleQuestionSubmitted}
      />
    </div>
  );
};

export default QASection;