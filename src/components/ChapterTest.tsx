import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  X, 
  Trophy, 
  Clock, 
  BookOpen,
  Brain
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Test {
  id: string;
  title: string;
  description: string;
  passing_score: number;
}

interface TestQuestion {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  order_index: number;
}

interface UserTestAttempt {
  score: number;
  total_questions: number;
  passed: boolean;
  completed_at: string;
}

interface ChapterTestProps {
  chapterId: string;
  chapterTitle: string;
}

const ChapterTest = ({ chapterId, chapterTitle }: ChapterTestProps) => {
  const { user } = useAuth();
  const [test, setTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState<{score: number, passed: boolean} | null>(null);
  const [previousAttempts, setPreviousAttempts] = useState<UserTestAttempt[]>([]);
  const [isStarted, setIsStarted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestData();
  }, [chapterId]);

  const fetchTestData = async () => {
    try {
      // Fetch test for this chapter
      const { data: testData, error: testError } = await supabase
        .from('tests')
        .select('*')
        .eq('chapter_id', chapterId)
        .single();

      if (testError) throw testError;

      // Fetch questions for this test
      const { data: questionsData, error: questionsError } = await supabase
        .from('test_questions')
        .select('*')
        .eq('test_id', testData.id)
        .order('order_index');

      if (questionsError) throw questionsError;

      // Fetch previous attempts if user is logged in
      let attemptsData = [];
      if (user) {
        const { data: attempts } = await supabase
          .from('user_test_attempts')
          .select('score, total_questions, passed, completed_at')
          .eq('user_id', user.id)
          .eq('test_id', testData.id)
          .order('completed_at', { ascending: false });
        
        attemptsData = attempts || [];
      }

      setTest(testData);
      setQuestions(questionsData || []);
      setPreviousAttempts(attemptsData);
    } catch (error) {
      console.error('Error fetching test data:', error);
      toast({
        title: "Error",
        description: "Failed to load test",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const startTest = () => {
    setIsStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setTestResults(null);
  };

  const selectAnswer = (questionId: string, answer: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      submitTest();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const submitTest = async () => {
    if (!user || !test) return;

    try {
      // Calculate score
      let correctAnswers = 0;
      questions.forEach(question => {
        if (selectedAnswers[question.id] === question.correct_answer) {
          correctAnswers++;
        }
      });

      const score = Math.round((correctAnswers / questions.length) * 100);
      const passed = score >= test.passing_score;

      // Save test attempt
      const { error } = await supabase
        .from('user_test_attempts')
        .insert({
          user_id: user.id,
          test_id: test.id,
          score,
          total_questions: questions.length,
          passed
        });

      if (error) throw error;

      setTestResults({ score, passed });
      setShowResults(true);

      toast({
        title: passed ? "Congratulations! 🎉" : "Test Complete",
        description: passed 
          ? `You passed with ${score}%! Great job!`
          : `You scored ${score}%. Keep learning and try again!`
      });

      // Refresh previous attempts
      fetchTestData();
    } catch (error) {
      console.error('Error submitting test:', error);
      toast({
        title: "Error",
        description: "Failed to submit test",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading test...</p>
        </div>
      </Card>
    );
  }

  if (!test) {
    return (
      <Card className="p-6 text-center">
        <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No Test Available</h3>
        <p className="text-muted-foreground">
          Test for this chapter is not available yet.
        </p>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const bestAttempt = previousAttempts.length > 0 ? previousAttempts[0] : null;

  if (showResults && testResults) {
    return (
      <Card className="p-8">
        <div className="text-center">
          <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
            testResults.passed ? 'bg-growth' : 'bg-muted'
          }`}>
            {testResults.passed ? (
              <Trophy className="h-8 w-8 text-white" />
            ) : (
              <X className="h-8 w-8 text-muted-foreground" />
            )}
          </div>
          
          <h3 className="text-2xl font-bold mb-2">
            {testResults.passed ? 'Congratulations!' : 'Keep Learning!'}
          </h3>
          
          <div className="text-4xl font-bold mb-4 text-primary">
            {testResults.score}%
          </div>
          
          <p className="text-muted-foreground mb-6">
            {testResults.passed 
              ? `You passed the ${test.title}! You've mastered this chapter.`
              : `You need ${test.passing_score}% to pass. Review the lessons and try again.`
            }
          </p>

          <div className="flex gap-4 justify-center">
            <Button onClick={startTest} variant="outline">
              Try Again
            </Button>
            <Button onClick={() => setIsStarted(false)}>
              Back to Overview
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  if (!isStarted) {
    return (
      <Card className="p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
            <p className="text-muted-foreground mb-4">{test.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                {questions.length} questions
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                ~{Math.ceil(questions.length * 1.5)} minutes
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Trophy className="h-4 w-4" />
                {test.passing_score}% to pass
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4" />
                Multiple choice
              </div>
            </div>

            {bestAttempt && (
              <div className="mb-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Your Best Score</h4>
                <div className="flex items-center gap-4">
                  <Badge variant={bestAttempt.passed ? "default" : "secondary"}>
                    {bestAttempt.score}%
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {bestAttempt.passed ? 'Passed' : 'Not passed'} • {new Date(bestAttempt.completed_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <Button onClick={startTest} className="w-full" size="lg">
          <Brain className="h-5 w-5 mr-2" />
          {bestAttempt ? 'Retake Test' : 'Start Test'}
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="mb-4" />
      </div>

      {currentQuestion && (
        <div>
          <h3 className="text-xl font-semibold mb-6">
            {currentQuestion.question_text}
          </h3>

          <div className="space-y-3 mb-8">
            {[
              { key: 'A', text: currentQuestion.option_a },
              { key: 'B', text: currentQuestion.option_b },
              { key: 'C', text: currentQuestion.option_c },
              { key: 'D', text: currentQuestion.option_d }
            ].map((option) => (
              <Button
                key={option.key}
                variant={selectedAnswers[currentQuestion.id] === option.key ? "default" : "outline"}
                className="w-full p-4 h-auto text-left justify-start"
                onClick={() => selectAnswer(currentQuestion.id, option.key)}
              >
                <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 text-sm font-medium">
                  {option.key}
                </span>
                {option.text}
              </Button>
            ))}
          </div>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <Button 
              onClick={nextQuestion}
              disabled={!selectedAnswers[currentQuestion.id]}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Submit Test' : 'Next Question'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ChapterTest;