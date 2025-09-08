import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, MessageCircle, Minimize2 } from 'lucide-react';
import CommunityChat from './CommunityChat';

interface FloatingChatWidgetProps {
  originalPosition?: { top: number; bottom: number };
}

const FloatingChatWidget = ({ originalPosition }: FloatingChatWidgetProps) => {
  const [isFloating, setIsFloating] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const originalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Slide in animation on mount
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!originalPosition) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const chatOriginalTop = originalPosition.top;
      const chatOriginalBottom = originalPosition.bottom;
      
      // Check if original chat area is visible in viewport
      const isOriginalVisible = 
        chatOriginalTop <= scrollY + windowHeight && 
        chatOriginalBottom >= scrollY;

      // If we're near the original position, dock the chat
      if (isOriginalVisible && isFloating) {
        setIsFloating(false);
      } else if (!isOriginalVisible && !isFloating) {
        setIsFloating(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFloating, originalPosition]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Original position placeholder - invisible but maintains layout */}
      <div ref={originalRef} className="invisible pointer-events-none">
        <CommunityChat />
      </div>

      {/* Floating/Docked Chat Widget */}
      {!isMinimized && (
        <div
          ref={chatRef}
          className={`
            fixed z-50 transition-all duration-500 ease-in-out
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
            ${isFloating 
              ? 'bottom-4 right-4 max-w-sm shadow-xl border border-border/20' 
              : 'bottom-0 right-0 max-w-full shadow-lg'
            }
            ${!isExpanded && isFloating ? 'transform hover:scale-105 transition-transform duration-200' : ''}
          `}
          style={{
            // Responsive width handling
            width: isFloating 
              ? 'min(24rem, calc(100vw - 2rem))' 
              : originalPosition ? 'auto' : '24rem'
          }}
        >
          {/* Chat Header - only visible when floating */}
          {isFloating && (
            <div className="bg-card border border-border rounded-t-lg px-4 py-2 flex items-center justify-between shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Community Chat</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm" />
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleExpanded}
                  className="h-6 w-6 p-0 hover:bg-muted/50 transition-colors duration-200"
                >
                  {isExpanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronUp className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMinimized}
                  className="h-6 w-6 p-0 hover:bg-muted/50 transition-colors duration-200"
                  title="Minimize chat"
                >
                  <Minimize2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Chat Content */}
          <div 
            className={`
              transition-all duration-300 ease-in-out overflow-hidden bg-card/95 backdrop-blur-sm
              ${isFloating ? 'rounded-b-lg border-x border-b border-border' : 'rounded-lg border border-border'}
              ${isFloating && !isExpanded ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}
            `}
          >
            <CommunityChat />
          </div>

          {/* Mobile touch indicator when floating and collapsed */}
          {isFloating && !isExpanded && (
            <div className="absolute inset-x-0 -top-1 flex justify-center pointer-events-none">
              <div className="w-8 h-1 bg-muted-foreground/20 rounded-full shadow-sm" />
            </div>
          )}
        </div>
      )}

      {/* Minimized chat button */}
      {isMinimized && (
        <Button
          onClick={toggleMinimized}
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 animate-scale-in"
          title="Open chat"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Backdrop for mobile when expanded */}
      {isFloating && isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </>
  );
};

export default FloatingChatWidget;