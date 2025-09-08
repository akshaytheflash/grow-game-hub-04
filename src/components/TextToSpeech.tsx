import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

interface TextToSpeechProps {
  text: string;
  className?: string;
}

const TextToSpeech = ({ text, className = "" }: TextToSpeechProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check if speech synthesis is supported
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const startSpeaking = () => {
    if (!isSupported) {
      toast.error('Text-to-speech is not supported in your browser');
      return;
    }

    if (!text.trim()) {
      toast.error('No text content to read');
      return;
    }

    // If paused, resume
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Configure speech settings
    utterance.rate = 0.9; // Slightly slower for better comprehension
    utterance.pitch = 1;
    utterance.volume = 1;

    // Set up event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
      toast.error('Error occurred while reading text');
    };

    utterance.onpause = () => {
      setIsPaused(true);
      setIsPlaying(false);
    };

    utterance.onresume = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    // Start speaking
    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeaking = () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-1">
        {!isPlaying && !isPaused ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={startSpeaking}
            className="h-8 w-8 p-0"
            title="Play audio"
          >
            <Play className="h-4 w-4" />
          </Button>
        ) : isPlaying ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={pauseSpeaking}
            className="h-8 w-8 p-0"
            title="Pause audio"
          >
            <Pause className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            onClick={startSpeaking}
            className="h-8 w-8 p-0"
            title="Resume audio"
          >
            <Play className="h-4 w-4" />
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={stopSpeaking}
          className="h-8 w-8 p-0"
          title="Stop audio"
          disabled={!isPlaying && !isPaused}
        >
          <Square className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Volume2 className="h-4 w-4" />
        <span>Listen</span>
      </div>
    </div>
  );
};

export default TextToSpeech;