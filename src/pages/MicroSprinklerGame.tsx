import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import BackButton from "@/components/BackButton";
import { ArrowLeft, Droplets, Target, CheckCircle, AlertCircle, Clock, Trophy, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const MicroSprinklerGame = () => {
  const [gameState, setGameState] = useState("playing"); // playing, won, lost
  const [waterLevel, setWaterLevel] = useState(100);
  const [coverage, setCoverage] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [activeSprinklers, setActiveSprinklers] = useState<number[]>([]);
  const [sprinklerPressure, setSprinklerPressure] = useState<Record<number, number>>({});

  const totalSprinklers = 9;
  const targetCoverage = 85;
  const gridSize = 3; // 3x3 grid

  useEffect(() => {
    if (timeLeft > 0 && gameState === "playing") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameState(coverage >= targetCoverage ? "won" : "lost");
    }
  }, [timeLeft, gameState, coverage]);

  useEffect(() => {
    // Calculate coverage based on active sprinklers and their pressure
    const newCoverage = activeSprinklers.reduce((total, sprinklerIndex) => {
      const pressure = sprinklerPressure[sprinklerIndex] || 0;
      return total + (pressure * 10); // Each pressure point covers 10% area
    }, 0);
    setCoverage(Math.min(100, newCoverage));
  }, [activeSprinklers, sprinklerPressure]);

  const toggleSprinkler = (sprinklerIndex: number) => {
    if (waterLevel <= 0) return;

    const isActive = activeSprinklers.includes(sprinklerIndex);
    
    if (isActive) {
      // Turn off sprinkler
      setActiveSprinklers(prev => prev.filter(s => s !== sprinklerIndex));
      setSprinklerPressure(prev => ({ ...prev, [sprinklerIndex]: 0 }));
    } else {
      // Turn on sprinkler with initial pressure
      setActiveSprinklers(prev => [...prev, sprinklerIndex]);
      setSprinklerPressure(prev => ({ ...prev, [sprinklerIndex]: 3 }));
      setWaterLevel(prev => Math.max(0, prev - 5));
      setScore(prev => prev + 5);
    }
  };

  const adjustPressure = (sprinklerIndex: number, delta: number) => {
    if (!activeSprinklers.includes(sprinklerIndex)) return;
    
    setSprinklerPressure(prev => {
      const currentPressure = prev[sprinklerIndex] || 0;
      const newPressure = Math.max(1, Math.min(5, currentPressure + delta));
      
      if (delta > 0) {
        setWaterLevel(water => Math.max(0, water - 3));
        setScore(s => s + 2);
      }
      
      return { ...prev, [sprinklerIndex]: newPressure };
    });
  };

  const resetGame = () => {
    setGameState("playing");
    setWaterLevel(100);
    setCoverage(0);
    setScore(0);
    setTimeLeft(90);
    setActiveSprinklers([]);
    setSprinklerPressure({});
  };

  const getSprinklerCoverage = (index: number, pressure: number) => {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const radius = pressure * 0.3; // Coverage radius based on pressure
    
    return { row, col, radius };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50">
      <Navigation />
      <BackButton />
      
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/learn" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Learn
            </Link>
            <Badge variant="secondary" className="px-3 py-1">
              <Zap className="h-4 w-4 mr-2" />
              Micro Sprinkler Master
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Game Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-blue-100 to-green-100 mb-4">
            <Zap className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Micro Sprinkler Challenge
          </h1>
          <p className="text-muted-foreground">
            Optimize sprinkler placement and pressure to achieve {targetCoverage}% field coverage efficiently!
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
            <div className="text-2xl font-bold text-foreground">{Math.round(coverage)}%</div>
            <div className="text-sm text-muted-foreground">Coverage</div>
          </Card>
          <Card className="p-4 text-center">
            <Trophy className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{score}</div>
            <div className="text-sm text-muted-foreground">Score</div>
          </Card>
        </div>

        {/* Game Board */}
        <Card className="p-8 mb-8">
          <div className="relative bg-gradient-to-br from-amber-100 via-green-100 to-amber-50 rounded-lg p-8 min-h-[500px] overflow-hidden">
            {/* Soil texture background */}
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, #8B4513 1px, transparent 1px),
                                 radial-gradient(circle at 75% 75%, #A0522D 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            {/* Field Grid */}
            <div className="grid grid-cols-3 gap-6 h-full relative z-10">
              {Array.from({ length: totalSprinklers }).map((_, index) => {
                const isActive = activeSprinklers.includes(index);
                const pressure = sprinklerPressure[index] || 0;
                const { radius } = getSprinklerCoverage(index, pressure);
                const isWatered = isActive && pressure > 0;
                
                return (
                  <div key={index} className="relative flex flex-col items-center justify-center min-h-[120px] bg-gradient-to-b from-amber-50/50 to-green-100/50 rounded-lg border border-green-200/30">
                    {/* Plants/Crops */}
                    <div className="absolute inset-2 grid grid-cols-3 gap-1">
                      {Array.from({ length: 9 }).map((_, plantIndex) => (
                        <div key={plantIndex} className="flex items-end justify-center">
                          {/* Plant stem */}
                          <div className={`w-1 transition-all duration-500 ${
                            isWatered ? 'bg-green-500 h-4' : 'bg-green-400/70 h-3'
                          }`}></div>
                          {/* Plant leaves */}
                          <div className={`absolute bottom-2 transition-all duration-500 ${
                            isWatered ? 'text-green-500 scale-110' : 'text-green-400/80'
                          }`}>
                            <div className="text-xs">🌱</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Water coverage effect */}
                    {isActive && (
                      <div 
                        className="absolute rounded-full bg-gradient-radial from-blue-200/60 via-blue-100/40 to-transparent border border-blue-300/40 animate-pulse"
                        style={{
                          width: `${radius * 120}px`,
                          height: `${radius * 120}px`,
                          zIndex: 2
                        }}
                      >
                        {/* Water droplets */}
                        {Array.from({ length: 12 }).map((_, dropIndex) => (
                          <div
                            key={dropIndex}
                            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-bounce"
                            style={{
                              top: `${20 + (dropIndex % 3) * 20}%`,
                              left: `${20 + (dropIndex % 4) * 20}%`,
                              animationDelay: `${dropIndex * 0.1}s`,
                              animationDuration: `${0.8 + (dropIndex % 3) * 0.2}s`
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
                    
                    {/* Realistic Sprinkler */}
                    <div className="relative z-20">
                      <Button
                        variant="ghost"
                        className={`w-12 h-12 rounded-full transition-all duration-300 relative border-2 ${
                          isActive 
                            ? "bg-gradient-to-b from-gray-300 to-gray-500 border-gray-600 text-white shadow-xl" 
                            : "bg-gradient-to-b from-gray-200 to-gray-400 border-gray-500 text-gray-700 hover:from-gray-250 hover:to-gray-450"
                        }`}
                        onClick={() => toggleSprinkler(index)}
                        disabled={gameState !== "playing"}
                      >
                        {/* Sprinkler head */}
                        <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-blue-400' : 'bg-gray-600'}`}>
                          <div className="w-1 h-1 bg-white rounded-full mx-auto mt-1"></div>
                        </div>
                        
                        {/* Water spray animation */}
                        {isActive && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            {Array.from({ length: 16 }).map((_, i) => (
                              <div
                                key={i}
                                className="absolute w-0.5 h-3 bg-gradient-to-t from-blue-400 to-blue-200 rounded-full"
                                style={{
                                  transform: `rotate(${i * 22.5}deg) translateY(-${15 + pressure * 8}px)`,
                                  animationDelay: `${i * 0.05}s`,
                                  animation: `ping ${1.2 - pressure * 0.15}s cubic-bezier(0, 0, 0.2, 1) infinite`
                                }}
                              ></div>
                            ))}
                          </div>
                        )}
                      </Button>
                      
                      {/* Pressure Controls */}
                      {isActive && (
                        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex items-center space-x-1 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-5 h-5 p-0 text-xs rounded-full"
                            onClick={() => adjustPressure(index, -1)}
                            disabled={pressure <= 1}
                          >
                            -
                          </Button>
                          <span className="text-xs font-medium w-4 text-center text-gray-700">{pressure}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-5 h-5 p-0 text-xs rounded-full"
                            onClick={() => adjustPressure(index, 1)}
                            disabled={pressure >= 5 || waterLevel <= 0}
                          >
                            +
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground bg-white/70 px-2 py-1 rounded">
                      Field {index + 1}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coverage Progress Bar */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Field Coverage</span>
                  <span className="text-sm">{Math.round(coverage)}% / {targetCoverage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      coverage >= targetCoverage ? 'bg-green-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(100, coverage)}%` }}
                  ></div>
                </div>
              </div>
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
                {gameState === "won" ? "Excellent Work!" : "Game Over"}
              </h2>
              
              <p className="text-muted-foreground mb-4">
                {gameState === "won" 
                  ? `You achieved ${Math.round(coverage)}% coverage with optimal sprinkler management!`
                  : `You achieved ${Math.round(coverage)}% coverage. You needed ${targetCoverage}% to win!`
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
                <Link to="/learn">
                  Back to Learn
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
              Click sprinklers to turn them on/off and cover different field zones
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Use +/- buttons to adjust water pressure for better coverage
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Achieve {targetCoverage}% field coverage within 90 seconds to win
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Higher pressure uses more water but covers larger areas
            </li>
            <li className="flex items-start">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Micro sprinklers provide uniform water distribution for efficient irrigation
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default MicroSprinklerGame;