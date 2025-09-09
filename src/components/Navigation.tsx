import { Button } from "@/components/ui/button";
import { Leaf, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navigation = () => {
  const { user, signOut } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (user && !hasShownWelcome) {
      setShowWelcome(true);
      setHasShownWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 15000); // 15 seconds

      return () => clearTimeout(timer);
    }
  }, [user, hasShownWelcome]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <Leaf className="h-8 w-8 text-leaf" />
          <span className="text-2xl font-bold text-foreground">KrishiKhel</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/learn" className="text-foreground hover:text-primary transition-colors">
            Learn
          </Link>
          <Link to="/weather" className="text-foreground hover:text-primary transition-colors">
            Weather
          </Link>
          <Link to="/community" className="text-foreground hover:text-primary transition-colors">
            Community
          </Link>
          <Link to="/features" className="text-foreground hover:text-primary transition-colors">
            Features
          </Link>
          <Link to="/how-it-works" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </Link>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <>
                <div className={`text-sm text-muted-foreground transition-opacity duration-500 ${
                  showWelcome ? 'opacity-100' : 'opacity-0'
                }`}>
                  {showWelcome && (
                    <span>Welcome, {user.email?.split('@')[0]}!</span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button variant="hero" size="sm" asChild>
                  <Link to="/auth">Get Started</Link>
                </Button>
              </>
            )}
          </div>
          
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link 
                    to="/learn" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Learn
                  </Link>
                  <Link 
                    to="/weather" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Weather
                  </Link>
                  <Link 
                    to="/community" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Community
                  </Link>
                  <Link 
                    to="/features" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    to="/how-it-works" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    How It Works
                  </Link>
                  <Link 
                    to="/about" 
                    className="text-foreground hover:text-primary transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  
                  {/* Theme Toggle in Mobile */}
                  <div className="flex items-center justify-between py-2">
                    <span className="text-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                  
                  {/* User Actions in Mobile */}
                  <div className="border-t pt-4 mt-4">
                    {user ? (
                      <>
                        <div className="text-sm text-muted-foreground mb-4">
                          Welcome, {user.email?.split('@')[0]}!
                        </div>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Button variant="ghost" className="w-full" asChild>
                          <Link 
                            to="/auth"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Sign In
                          </Link>
                        </Button>
                        <Button variant="hero" className="w-full" asChild>
                          <Link 
                            to="/auth"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            Get Started
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
