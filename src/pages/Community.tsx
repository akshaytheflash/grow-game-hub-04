import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import CommunityHubLayout from "@/components/community/CommunityHubLayout";
import FloatingChatWidget from "@/components/community/FloatingChatWidget";

const Community = () => {
  const [chatPosition, setChatPosition] = useState<{ top: number; bottom: number } | undefined>();
  const layoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate the chat's original position for auto-docking
    const updateChatPosition = () => {
      if (layoutRef.current) {
        const rect = layoutRef.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        
        setChatPosition({
          top: rect.top + scrollY + 400, // Approximate position where chat would be
          bottom: rect.bottom + scrollY
        });
      }
    };

    updateChatPosition();
    window.addEventListener('resize', updateChatPosition);
    
    return () => window.removeEventListener('resize', updateChatPosition);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <div ref={layoutRef}>
        <CommunityHubLayout />
      </div>
      
      {/* Floating Chat Widget */}
      <FloatingChatWidget originalPosition={chatPosition} />
    </div>
  );
};

export default Community;