import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, GraduationCap, MapPin, Calendar, Plus, MessageSquare } from "lucide-react";
import CreatePostDialog from "./CreatePostDialog";
import AskQuestionDialog from "./AskQuestionDialog";

const QuickActions = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showAskQuestion, setShowAskQuestion] = useState(false);

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => setShowCreatePost(true)}
          >
            <Camera className="w-4 h-4 mr-2" />
            Share Crop Photo
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start"
            onClick={() => setShowAskQuestion(true)}
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            Ask Expert
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <MapPin className="w-4 h-4 mr-2" />
            Find Local Pod
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Calendar className="w-4 h-4 mr-2" />
            Join Session
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <Plus className="w-4 h-4 mr-2" />
            Start Challenge
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start">
            <MessageSquare className="w-4 h-4 mr-2" />
            Create Pod
          </Button>
        </CardContent>
      </Card>

      <CreatePostDialog
        open={showCreatePost}
        onOpenChange={setShowCreatePost}
        onPostCreated={() => setShowCreatePost(false)}
      />

      <AskQuestionDialog
        open={showAskQuestion}
        onOpenChange={setShowAskQuestion}
        onQuestionSubmitted={() => setShowAskQuestion(false)}
      />
    </>
  );
};

export default QuickActions;