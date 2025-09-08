import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCommunity } from '@/hooks/useCommunity';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface AskQuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionId?: string;
  onQuestionSubmitted?: () => void;
}

const AskQuestionDialog = ({ open, onOpenChange, sessionId, onQuestionSubmitted }: AskQuestionDialogProps) => {
  const { user } = useAuth();
  const { askExpertQuestion, loading } = useCommunity();
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to ask a question');
      return;
    }

    if (!question.trim()) {
      toast.error('Please enter your question');
      return;
    }

    try {
      await askExpertQuestion({
        question: question.trim(),
        session_id: sessionId,
      });
      setQuestion('');
      onOpenChange(false);
      onQuestionSubmitted?.();
    } catch (error) {
      toast.error('Failed to submit question');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ask an Expert</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Your Question</Label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="What would you like to know? Be specific about your farming challenge or question..."
              rows={6}
              required
            />
            <p className="text-sm text-muted-foreground">
              {sessionId ? 'This question will be submitted for the expert session.' : 'Your question will be reviewed by our experts.'}
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Question'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AskQuestionDialog;