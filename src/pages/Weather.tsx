import Navigation from "@/components/Navigation";
import WeatherDashboard from "@/components/weather/WeatherDashboard";
import BackButton from "@/components/BackButton";

const Weather = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <BackButton />
      <main className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Weather & Crop Guide
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get real-time weather conditions and personalized crop recommendations 
                based on your location's climate data.
              </p>
            </div>

            <div className="flex justify-center">
              <WeatherDashboard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Weather;