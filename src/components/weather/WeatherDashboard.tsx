import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Cloud, 
  Droplets, 
  Eye, 
  Gauge, 
  Sun, 
  Thermometer, 
  Wind,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Sprout,
  MapPin,
  Lightbulb,
  Leaf
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CropRecommendation {
  category: 'ideal' | 'good' | 'moderate' | 'caution' | 'avoid' | 'rainy' | 'cold';
  icon: string;
  crops: string[];
  reason: string;
  tips?: string[];
}

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    description: string;
    feelsLike: number;
    weatherCode: number;
  };
  cropRecommendations: CropRecommendation[];
  farmingTips: string[];
}

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();

  // Weather code to description mapping from Open-Meteo WMO codes
  const getWeatherDescription = (code: number): string => {
    const weatherCodes: Record<number, string> = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
      55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
      71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow',
      95: 'Thunderstorm', 96: 'Thunderstorm with hail', 99: 'Thunderstorm with heavy hail'
    };
    return weatherCodes[code] || 'Unknown';
  };

  // Function to map Open-Meteo weather codes to emoji icons
  const getWeatherIcon = (code: number): string => {
    const icons: Record<number, string> = {
      0: '☀️', 1: '🌤️', 2: '🌥️', 3: '☁️', 45: '🌫️', 48: '🌫️',
      51: '🌧️', 53: '🌧️', 55: '🌧️', 61: '🌧️', 63: '🌧️', 65: '🌧️',
      71: '🌨️', 73: '🌨️', 75: '🌨️', 95: '⛈️', 96: '⛈️', 99: '⛈️'
    };
    return icons[code] || '❓';
  };

  // Enhanced crop recommendations based on weather conditions
  const getCropRecommendations = (currentTemp: number, currentHumidity: number, weatherCode: number): CropRecommendation[] => {
    const recommendations: CropRecommendation[] = [];

    // Perfect conditions for warm-season crops
    if (currentTemp >= 20 && currentTemp <= 30 && currentHumidity >= 40 && currentHumidity <= 70 && weatherCode <= 3) {
      recommendations.push({
        category: 'ideal',
        icon: '🟢',
        crops: ['Tomatoes', 'Peppers', 'Eggplant', 'Okra', 'Beans', 'Squash'],
        reason: 'Perfect warm, sunny conditions with moderate humidity. Ideal for heat-loving vegetables.',
        tips: ['Water deeply but less frequently', 'Mulch around plants to retain moisture', 'Provide support for climbing varieties']
      });
    }

    // Good conditions for cool-season crops
    if (currentTemp >= 10 && currentTemp < 20 && currentHumidity < 80) {
      recommendations.push({
        category: 'good',
        icon: '🔵',
        crops: ['Lettuce', 'Spinach', 'Carrots', 'Broccoli', 'Cabbage', 'Kale'],
        reason: 'Cool temperatures are perfect for leafy greens and root vegetables.',
        tips: ['Plant seeds directly in garden', 'Harvest in morning when leaves are crisp', 'Succession plant every 2 weeks']
      });
    }

    // Moderate conditions
    if (currentTemp >= 15 && currentTemp < 25 && currentHumidity >= 30 && currentHumidity <= 80) {
      recommendations.push({
        category: 'moderate',
        icon: '🟡',
        crops: ['Onions', 'Garlic', 'Herbs', 'Peas', 'Radishes'],
        reason: 'Good general growing conditions for hardy vegetables and herbs.',
        tips: ['Perfect time for transplanting seedlings', 'Good conditions for seed germination', 'Monitor for pests as they become more active']
      });
    }

    // Rainy weather recommendations
    if (weatherCode >= 51 && weatherCode <= 65) {
      recommendations.push({
        category: 'rainy',
        icon: '🌧️',
        crops: ['Rice', 'Mushrooms', 'Water spinash', 'Taro'],
        reason: 'Wet conditions favor water-loving crops. Avoid planting most vegetables.',
        tips: ['Improve drainage in garden beds', 'Cover sensitive plants', 'Good time for indoor seed starting']
      });
    }

    // Hot weather warnings
    if (currentTemp > 30) {
      recommendations.push({
        category: 'caution',
        icon: '🔴',
        crops: ['Heat-tolerant herbs', 'Amaranth', 'Desert plants'],
        reason: 'Very high temperatures. Most crops will struggle without protection.',
        tips: ['Provide shade cloth (30-50%)', 'Water early morning or evening', 'Mulch heavily to cool soil']
      });

      recommendations.push({
        category: 'avoid',
        icon: '❌',
        crops: ['Lettuce', 'Spinach', 'Broccoli', 'Peas', 'Cool-season herbs'],
        reason: 'Too hot - these crops will bolt, wilt, or fail to germinate.',
        tips: ['Wait for cooler weather', 'Start seeds indoors with AC', 'Focus on heat-tolerant varieties']
      });
    }

    // High humidity warnings
    if (currentHumidity > 80) {
      recommendations.push({
        category: 'avoid',
        icon: '💧',
        crops: ['Tomatoes', 'Potatoes', 'Cucumbers'],
        reason: 'High humidity increases fungal disease risk (blight, mildew, rot).',
        tips: ['Improve air circulation', 'Apply preventive fungicides', 'Harvest frequently to prevent rot']
      });
    }

    // Cold weather
    if (currentTemp < 10) {
      recommendations.push({
        category: 'cold',
        icon: '🥶',
        crops: ['Winter wheat', 'Garlic', 'Onions', 'Cold-hardy greens'],
        reason: 'Cold conditions limit most vegetable growth.',
        tips: ['Use cold frames or row covers', 'Focus on cold-hardy varieties', 'Prepare garden for spring']
      });
    }

    return recommendations;
  };

  // Generate weather-based farming tips
  const getFarmingTips = (currentTemp: number, currentHumidity: number, weatherCode: number, windSpeed: number): string[] => {
    const tips: string[] = [];

    if (weatherCode >= 61 && weatherCode <= 65) {
      tips.push('💧 Rain expected: Good time to plant water-loving crops and collect rainwater.');
      tips.push('🏠 Move potted plants under cover to prevent waterlogging.');
    }

    if (currentTemp > 25) {
      tips.push('🌡️ Hot weather: Water plants early morning (6-8 AM) to reduce evaporation.');
      tips.push('☂️ Consider installing shade cloth to protect sensitive crops.');
    }

    if (currentHumidity > 70) {
      tips.push('💨 High humidity: Ensure good air circulation to prevent fungal diseases.');
      tips.push('✂️ Prune dense foliage to improve airflow around plants.');
    }

    if (windSpeed > 15) {
      tips.push('🌬️ Windy conditions: Stake tall plants and secure lightweight row covers.');
      tips.push('🛡️ Protect young seedlings with wind barriers or cloches.');
    }

    if (weatherCode <= 1 && currentTemp >= 15 && currentTemp <= 25) {
      tips.push('☀️ Perfect weather for garden work: Great time for planting, weeding, and harvesting.');
      tips.push('🌱 Ideal conditions for seed germination - start your next crop succession.');
    }

    if (tips.length === 0) {
      tips.push('🌿 Monitor your plants daily for signs of stress or pest issues.');
      tips.push('📅 Keep a garden journal to track what works best in your climate.');
    }

    return tips;
  };

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // Get user's current location
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
        } else {
          reject(new Error('Geolocation is not supported by this browser.'));
        }
      });

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Use Open-Meteo API for weather data
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m,apparent_temperature&timezone=auto`;
      const response = await fetch(weatherUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch weather data from API.');
      }

      const data = await response.json();
      
      const currentTemp = data.current.temperature_2m;
      const weatherCode = data.current.weather_code;
      const humidity = data.current.relative_humidity_2m;
      const windSpeed = data.current.wind_speed_10m;
      const feelsLike = data.current.apparent_temperature;
      const description = getWeatherDescription(weatherCode);

      // Get location name
      let locationName = 'Your Location';
      try {
        const locationUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
        const locationResponse = await fetch(locationUrl);

        if (locationResponse.ok) {
          const locationData = await locationResponse.json();
          if (locationData.address && (locationData.address.city || locationData.address.town || locationData.address.village)) {
            locationName = locationData.address.city || locationData.address.town || locationData.address.village;
            if (locationData.address.country) {
              locationName += `, ${locationData.address.country}`;
            }
          }
        }
      } catch (locationError) {
        console.error('Error fetching location name:', locationError);
      }

      // Get crop recommendations and farming tips
      const recommendations = getCropRecommendations(currentTemp, humidity, weatherCode);
      const farmingTips = getFarmingTips(currentTemp, humidity, weatherCode, windSpeed);

      setWeatherData({
        location: locationName,
        current: {
          temperature: Math.round(currentTemp),
          humidity,
          windSpeed,
          description: `${getWeatherIcon(weatherCode)} ${description}`,
          feelsLike: Math.round(feelsLike),
          weatherCode
        },
        cropRecommendations: recommendations,
        farmingTips
      });

      setError("");
    } catch (error) {
      console.error('Error fetching weather:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
      setError(errorMessage);
      toast({
        title: "Weather Error",
        description: "Failed to fetch weather data. Please allow location access and try again.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ideal': return 'bg-growth text-white';
      case 'good': 
      case 'moderate': return 'bg-sky text-white';
      case 'caution': return 'bg-harvest text-white';
      case 'avoid': return 'bg-destructive text-white';
      case 'rainy': return 'bg-sky/80 text-white';
      case 'cold': return 'bg-primary text-white';
      default: return 'bg-muted text-foreground';
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-background rounded-2xl shadow-xl p-8 space-y-6 text-center">
        <div className="flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
        <p className="mt-4 text-muted-foreground">Fetching weather data...</p>
      </div>
    );
  }

  if (error || !weatherData) {
    return (
      <div className="w-full max-w-2xl mx-auto bg-background rounded-2xl shadow-xl p-8">
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error || "No weather data available"}
            <br />
            <span className="text-sm mt-2 block">Please make sure you have allowed location access and try again.</span>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-background rounded-2xl shadow-xl p-8 space-y-6">
      {/* Location Header */}
      <div className="flex items-center justify-center space-x-2 text-muted-foreground">
        <MapPin className="h-5 w-5" />
        <h2 className="text-xl font-semibold">{weatherData.location}</h2>
      </div>

      {/* Current Weather Card */}
      <Card className="bg-sky/10 border-sky/20">
        <CardContent className="p-6 text-center">
          <p className="text-2xl text-sky font-bold capitalize mb-2">{weatherData.current.description}</p>
          <div className="text-6xl font-extrabold text-sky flex items-center justify-center">
            <span>{weatherData.current.temperature}</span>
            <span className="text-3xl align-top">°C</span>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            Feels like {weatherData.current.feelsLike}°C
          </p>
        </CardContent>
      </Card>
      
      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <Card className="p-3">
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-sky" />
            <div>
              <p className="font-semibold">Humidity</p>
              <p className="text-muted-foreground">{weatherData.current.humidity}%</p>
            </div>
          </div>
        </Card>
        <Card className="p-3">
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-leaf" />
            <div>
              <p className="font-semibold">Wind Speed</p>
              <p className="text-muted-foreground">{weatherData.current.windSpeed} km/h</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Crop Recommendations */}
      <div className="text-left space-y-4">
        <div className="flex items-center space-x-2 justify-center">
          <Leaf className="h-6 w-6 text-growth" />
          <h3 className="text-xl font-bold">🌱 Smart Crop Recommendations</h3>
        </div>
        <div className="space-y-3">
          {weatherData.cropRecommendations.map((rec, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">{rec.icon}</span>
                <h4 className="font-bold text-lg capitalize">
                  {rec.category} {rec.category === 'avoid' ? '' : 'Crops'}
                </h4>
              </div>
              <p className="text-sm mb-3 text-muted-foreground">{rec.reason}</p>
              <div className="mb-3 flex flex-wrap gap-2">
                {rec.crops.map((crop, cropIndex) => (
                  <Badge key={cropIndex} className={getCategoryColor(rec.category)}>
                    {crop}
                  </Badge>
                ))}
              </div>
              {rec.tips && (
                <div className="text-xs text-muted-foreground">
                  <strong>Tips:</strong>
                  <ul className="mt-1 space-y-1">
                    {rec.tips.map((tip, tipIndex) => (
                      <li key={tipIndex}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Farming Tips */}
      <div className="text-left space-y-4">
        <div className="flex items-center space-x-2 justify-center">
          <Lightbulb className="h-6 w-6 text-harvest" />
          <h3 className="text-xl font-bold">💡 Weather-Based Tips</h3>
        </div>
        <Card className="bg-harvest/10 border-harvest/20 p-4 space-y-2">
          {weatherData.farmingTips.map((tip, index) => (
            <p key={index} className="text-sm">{tip}</p>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default WeatherDashboard;