import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageCircle, 
  Send, 
  Users, 
  Hash,
  Smile,
  Image,
  MapPin,
  Leaf,
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";
import { useCommunityChat, type ChatMessage as DatabaseChatMessage } from "@/hooks/useCommunityChat";
import { useAuth } from "@/hooks/useAuth";
import { format } from "date-fns";

interface ChatMessage {
  id: string;
  user: {
    name: string;
    avatar: string;
    status: 'online' | 'offline';
  };
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'system';
}

interface ChatRoom {
  id: string;
  name: string;
  description: string;
  type: 'general' | 'pod' | 'region' | 'crop';
  members: number;
  unread: number;
  icon: any;
}

const CommunityChat = () => {
  const [activeRoom, setActiveRoom] = useState("general");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const { messages, loading, isMuted, sendMessage, toggleMute } = useCommunityChat(activeRoom);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatRooms: ChatRoom[] = [
    {
      id: "general",
      name: "General Chat",
      description: "Community-wide discussions",
      type: "general",
      members: 247,
      unread: 3,
      icon: MessageCircle
    },
    {
      id: "punjab-farmers",
      name: "Punjab Farmers",
      description: "Regional farming discussions",
      type: "region", 
      members: 45,
      unread: 0,
      icon: MapPin
    },
    {
      id: "wheat-growers",
      name: "Wheat Growers",
      description: "Wheat cultivation tips & tricks",
      type: "crop",
      members: 78,
      unread: 2,
      icon: Leaf
    },
    {
      id: "organic-pod",
      name: "Organic Pod",
      description: "Private pod discussion",
      type: "pod",
      members: 12,
      unread: 1,
      icon: Users
    }
  ];

  const chatMessages: Record<string, ChatMessage[]> = {
    general: [
      {
        id: "1",
        user: { name: "Priya S.", avatar: "PS", status: "online" },
        message: "Good morning everyone! Weather looks great for harvest season 🌾",
        timestamp: "09:15 AM",
        type: "text"
      },
      {
        id: "2",
        user: { name: "Ravi K.", avatar: "RK", status: "online" },
        message: "Yes! Finally some sunshine after all that rain. Perfect timing.",
        timestamp: "09:16 AM", 
        type: "text"
      },
      {
        id: "3",
        user: { name: "Expert Bot", avatar: "EB", status: "online" },
        message: "🤖 Weather Alert: Clear skies expected for the next 3 days. Ideal for harvesting activities.",
        timestamp: "09:17 AM",
        type: "system"
      },
      {
        id: "4",
        user: { name: "Singh Farm", avatar: "SF", status: "offline" },
        message: "Anyone know good rates for wheat in local mandis today?",
        timestamp: "09:20 AM",
        type: "text"
      }
    ],
    "wheat-growers": [
      {
        id: "1",
        user: { name: "Dr. Kumar", avatar: "DK", status: "online" },
        message: "Remember to check moisture levels before harvesting. Should be around 12-14%",
        timestamp: "08:30 AM",
        type: "text"
      },
      {
        id: "2",
        user: { name: "Farmer Anita", avatar: "FA", status: "online" },
        message: "Thank you doctor! My moisture meter shows 13.5%. Good to go?",
        timestamp: "08:32 AM",
        type: "text"
      }
    ]
  };

  const onlineUsers = [
    { name: "Priya S.", avatar: "PS", status: "Harvesting" },
    { name: "Ravi K.", avatar: "RK", status: "Field inspection" },
    { name: "Dr. Kumar", avatar: "DK", status: "Available for Q&A" },
    { name: "Singh Farm", avatar: "SF", status: "Market visit" },
    { name: "Anita M.", avatar: "AM", status: "Soil testing" }
  ];

  const handleSendMessage = async () => {
    if (message.trim()) {
      await sendMessage(message);
      setMessage("");
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getRoomIcon = (room: ChatRoom) => {
    const Icon = room.icon;
    return <Icon className="w-4 h-4" />;
  };

  // Helper function to get display name from user_id
  const getDisplayName = (msg: DatabaseChatMessage) => {
    // For now, just use user_id as fallback
    // TODO: Fetch user profile data separately or join with profiles table
    return `User ${msg.user_id.slice(0, 8)}`;
  };

  // Helper function to get user initials
  const getUserInitials = (msg: DatabaseChatMessage) => {
    const name = getDisplayName(msg);
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card className="h-[500px] flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Community Chat
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm" onClick={toggleMute}>
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-3 min-h-0">
        {/* Chat Rooms Tabs */}
        <Tabs value={activeRoom} onValueChange={setActiveRoom} className="flex flex-col flex-1 min-h-0">
          <TabsList className="grid w-full grid-cols-2 gap-1 h-auto p-1">
            <TabsTrigger value="general" className="flex items-center justify-center gap-1 p-2 h-auto min-h-[32px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Hash className="w-3 h-3 shrink-0" />
              <span>General</span>
              {chatRooms.find(r => r.id === "general")?.unread > 0 && (
                <Badge variant="destructive" className="w-4 h-4 p-0 text-xs flex items-center justify-center ml-1">
                  {chatRooms.find(r => r.id === "general")?.unread}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="wheat-growers" className="flex items-center justify-center gap-1 p-2 h-auto min-h-[32px] text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Leaf className="w-3 h-3 shrink-0" />
              <span>Wheat</span>
              {chatRooms.find(r => r.id === "wheat-growers")?.unread > 0 && (
                <Badge variant="destructive" className="w-4 h-4 p-0 text-xs flex items-center justify-center ml-1">
                  {chatRooms.find(r => r.id === "wheat-growers")?.unread}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeRoom} className="flex-1 flex flex-col space-y-3 min-h-0 mt-3">
            {/* Chat Messages */}
            <ScrollArea className="flex-1 min-h-0 pr-3">
              <div className="space-y-3">
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="text-xs text-muted-foreground">Loading messages...</div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex justify-center items-center py-8">
                    <div className="text-xs text-muted-foreground">No messages yet. Start the conversation!</div>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-2">
                      <Avatar className="w-6 h-6 mt-1">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-xs">{getUserInitials(msg)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-xs">{getDisplayName(msg)}</span>
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(msg.created_at), 'HH:mm')}
                          </span>
                        </div>
                        <p className="text-xs leading-relaxed break-words">{msg.message}</p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="flex items-center space-x-2 pt-2 border-t">
              <div className="flex-1 relative">
                <Input
                  placeholder={user ? "Type a message..." : "Please log in to chat"}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={!user}
                  className="text-xs pr-16"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Smile className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Image className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Button size="sm" onClick={handleSendMessage} disabled={!user || !message.trim()} className="h-8 px-3">
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Online Users (collapsed view) */}
        <div className="border-t pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground">Online ({onlineUsers.length})</span>
          </div>
          <div className="flex items-center space-x-1">
            {onlineUsers.slice(0, 8).map((user, index) => (
              <div key={index} className="relative">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-xs">{user.avatar}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 border border-background rounded-full"></div>
              </div>
            ))}
            {onlineUsers.length > 8 && (
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                <span className="text-xs">+{onlineUsers.length - 8}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityChat;