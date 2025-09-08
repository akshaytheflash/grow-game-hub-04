import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    // Check if there's browser history to go back to
    if (window.history.length > 1 && window.history.state) {
      navigate(-1);
    } else {
      // Default to home page if no valid previous page
      navigate('/');
    }
  };

  // Don't show back button on home page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 pt-4 pb-2">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg px-3 py-2 hover:bg-muted/50"
        aria-label="Go back to previous page"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </Button>
    </div>
  );
};

export default BackButton;