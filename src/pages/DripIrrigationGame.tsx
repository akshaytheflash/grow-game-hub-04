import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import { ArrowLeft, Droplets, Target, CheckCircle, AlertCircle, Clock, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const DripIrrigationGame = () => {
  const [gameState, setGameState] = useState("playing"); // playing, won, lost
  const [waterLevel, setWaterLevel] = useState(100);
  const [plantsWatered, setPlantsWatered] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [activePlants, setActivePlants] = useState<number[]>([]);

  const totalPlants = 12;
  const targetPlants = 8;

  useEffect(() => {
    if (timeLeft > 0 && gameState === "playing") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState(plantsWatered >= targetPlants ? "won" : "lost");
    }
  }, [timeLeft, gameState, plantsWatered]);

  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(() => {
        const randomPlant = Math.floor(Math.random() * totalPlants);
        setActivePlants(prev => {
          if (!prev.includes(randomPlant)) {
            return [...prev, randomPlant];
          }
          return prev;
        });

        setTimeout(() => {
          setActivePlants(prev => prev.filter(p => p !== randomPlant));
        }, 3000);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [gameState]);

  const waterPlant = (plantIndex: number) => {
    if (activePlants.includes(plantIndex) && waterLevel > 0) {
      setActivePlants(prev => prev.filter(p => p !== plantIndex));
      setPlantsWatered(prev => prev + 1);
      setWaterLevel(prev => Math.max(0, prev - 12));
      setScore(prev => prev + 10);
    }
  };

  const resetGame = () => {
    setGameState("playing");
    setWaterLevel(100);
    setPlantsWatered(0);
    setScore(0);
    setTimeLeft(60);
    setActivePlants([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      <Navigation />
      <BackButton />
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/goals" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Goals
            </Link>
            <Badge variant="secondary" className="px-3 py-1">
              <Droplets className="h-4 w-4 mr-2" />
              Drip Irrigation Master
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Game Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-blue-100 to-green-100 mb-4">
            <Droplets className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Drip Irrigation Challenge
          </h1>
          <p className="text-muted-foreground">
            Water the thirsty plants efficiently! Click when they need water to save 25% water usage.
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{timeLeft}s</div>
            <div className="text-sm text-muted-foreground">Time Left</div>
          </Card>
          <Card className="p-4 text-center">
            <Droplets className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{waterLevel}%</div>
            <div className="text-sm text-muted-foreground">Water Level</div>
          </Card>
          <Card className="p-4 text-center">
            <Target className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{plantsWatered}/{targetPlants}</div>
            <div className="text-sm text-muted-foreground">Plants Watered</div>
          </Card>
          <Card className="p-4 text-center">
            <Trophy className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </Card>
        </div>

        {/* Game Board */}
        <Card className="p-8 mb-8">
          <div className="relative">
            {/* Drip Irrigation Lines */}
            <div className="absolute inset-0 grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, lineIndex) => (
                <div key={lineIndex} className="relative">
                  <div className="w-full h-1 bg-gray-300 rounded-full mb-4"></div>
                  {Array.from({ length: 3 }).map((_, dropIndex) => (
                    <div 
                      key={dropIndex}
                      className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                      style={{
                        left: `${25 + dropIndex * 25}%`,
                        top: `${dropIndex * 2}px`,
                        animationDelay: `${(lineIndex + dropIndex) * 0.5}s`
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>

            {/* Plants Grid */}
            <div className="grid grid-cols-4 gap-6 pt-8">
              {Array.from({ length: totalPlants }).map((_, index) => {
                const isActive = activePlants.includes(index);
                const isWatered = plantsWatered > index;
                
                return (
                  <div key={index} className="text-center">
                    <Button
                      variant="ghost"
                      className={`w-20 h-20 rounded-full transition-all duration-300 relative overflow-hidden ${
                        isActive 
                          ? "bg-yellow-100 border-2 border-orange-400 animate-pulse hover:bg-yellow-200 shadow-lg" 
                          : isWatered 
                            ? "bg-green-100 border-2 border-green-400 shadow-md" 
                            : "bg-gray-100 border-2 border-gray-300"
                      }`}
                      onClick={() => waterPlant(index)}
                      disabled={gameState !== "playing" || !isActive}
                    >
                      {/* Realistic Plant Design */}
                      <div className="relative w-full h-full flex items-end justify-center">
                        {/* Soil base */}
                        <div className="absolute bottom-0 w-full h-3 bg-gradient-to-t from-amber-800 to-amber-600 rounded-b-full"></div>
                        
                        {/* Plant stem */}
                        <div className={`absolute bottom-3 w-1 bg-green-600 transition-all duration-300 ${
                          isWatered ? "h-6" : isActive ? "h-4" : "h-5"
                        }`}></div>
                        
                        {/* Leaves */}
                        <div className="absolute bottom-5 flex space-x-1">
                          <div className={`w-3 h-2 rounded-full transition-all duration-300 ${
                            isWatered 
                              ? "bg-green-500 shadow-sm" 
                              : isActive 
                                ? "bg-yellow-600 animate-pulse" 
                                : "bg-green-400"
                          } transform -rotate-45`}></div>
                          <div className={`w-3 h-2 rounded-full transition-all duration-300 ${
                            isWatered 
                              ? "bg-green-500 shadow-sm" 
                              : isActive 
                                ? "bg-yellow-600 animate-pulse" 
                                : "bg-green-400"
                          } transform rotate-45`}></div>
                        </div>
                        
                        {/* Additional leaves for watered plants */}
                        {isWatered && (
                          <>
                            <div className="absolute bottom-7 flex space-x-1">
                              <div className="w-2 h-2 bg-green-600 rounded-full transform -rotate-12"></div>
                              <div className="w-2 h-2 bg-green-600 rounded-full transform rotate-12"></div>
                            </div>
                            {/* Small flower for fully grown plants */}
                            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                              <div className="w-2 h-2 bg-pink-400 rounded-full shadow-sm"></div>
                            </div>
                          </>
                        )}
                        
                        {/* Wilting effect for thirsty plants */}
                        {isActive && (
                          <div className="absolute inset-0 bg-orange-200/30 rounded-full animate-pulse"></div>
                        )}
                        
                        {/* Water droplets animation for active watering */}
                        {isActive && (
                          <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                            <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="absolute top-1 left-1 w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        )}
                      </div>
                    </Button>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Plant {index + 1}
                    </div>
                    {isActive && (
                      <div className="mt-1">
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          Needs Water!
                        </Badge>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Game Over States */}
        {gameState !== "playing" && (
          <Card className="p-8 text-center">
            <div className="mb-6">
              {gameState === "won" ? (
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-green-100 mb-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              ) : (
                <div className="inline-flex items-center justify-center p-4 rounded-full bg-red-100 mb-4">
                  <AlertCircle className="h-12 w-12 text-red-600" />
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {gameState === "won" ? "Congratulations!" : "Game Over"}
              </h2>
              
              <p className="text-muted-foreground mb-4">
                {gameState === "won" 
                  ? `You successfully watered ${plantsWatered} plants and achieved 25% water savings!`
                  : `You only watered ${plantsWatered} out of ${targetPlants} required plants. Try again!`
                }
              </p>
              
              <div className="text-lg font-semibold text-primary mb-6">
                Final Score: {score} points
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={resetGame} size="lg">
                Play Again
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/goals">
                  Back to Goals
                </Link>
              </Button>
            </div>
          </Card>
        )}

        {/* Game Instructions */}
        <Card className="p-6 mt-8 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-foreground mb-3">How to Play:</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Click on plants when they show "🥵" (thirsty) to water them efficiently
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Water at least {targetPlants} plants within 60 seconds to win
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Each watering uses 12% of your water supply - be efficient!
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Drip irrigation systems save water by delivering it directly to plant roots
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DripIrrigationGame;