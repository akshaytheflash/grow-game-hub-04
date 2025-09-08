import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WeatherData {
  current: any;
  daily: any[];
  alerts?: any[];
}

interface CropRecommendation {
  category: 'ideal' | 'good' | 'avoid';
  crops: string[];
  reason: string;
}

function getCropRecommendations(current: any, daily: any[]): CropRecommendation[] {
  const temp = current.main.temp;
  const humidity = current.main.humidity;
  const precipitation = daily[0]?.rain?.['3h'] || 0;
  
  const recommendations: CropRecommendation[] = [];
  
  // Temperature-based recommendations
  if (temp >= 20 && temp <= 30 && humidity >= 40 && humidity <= 70) {
    recommendations.push({
      category: 'ideal',
      crops: ['Tomatoes', 'Peppers', 'Eggplant', 'Okra', 'Beans'],
      reason: 'Perfect temperature and humidity for warm-season crops'
    });
  }
  
  if (temp >= 15 && temp <= 25 && precipitation < 2) {
    recommendations.push({
      category: 'good',
      crops: ['Lettuce', 'Spinach', 'Carrots', 'Radishes', 'Peas'],
      reason: 'Good conditions for cool-season vegetables'
    });
  }
  
  if (temp > 35 || humidity > 80 || precipitation > 10) {
    recommendations.push({
      category: 'avoid',
      crops: ['Lettuce', 'Spinach', 'Peas', 'Broccoli'],
      reason: temp > 35 ? 'Too hot for cool-season crops' : 
              humidity > 80 ? 'High humidity may cause fungal diseases' :
              'Heavy rainfall may damage sensitive crops'
    });
  }
  
  return recommendations;
}

function getWeatherWarnings(current: any, daily: any[]): string[] {
  const warnings: string[] = [];
  
  // Check current conditions
  if (current.wind.speed > 15) {
    warnings.push('🌪️ Strong winds detected - secure crops and equipment');
  }
  
  if (current.main.temp < 0) {
    warnings.push('❄️ Frost warning - protect sensitive plants');
  }
  
  if (current.main.temp > 40) {
    warnings.push('🔥 Extreme heat warning - ensure adequate irrigation');
  }
  
  // Check forecast for tomorrow if available
  const tomorrow = daily[1];
  if (tomorrow) {
    const windSpeed = tomorrow.wind?.speed || 0;
    const precipitation = tomorrow.rain?.['3h'] || 0;
    
    if (windSpeed > 15) {
      warnings.push('🌪️ Strong winds expected tomorrow - secure crops and equipment');
    }
    
    if (precipitation > 20) {
      warnings.push('🌊 Heavy precipitation expected - risk of flooding and soil erosion');
    }
    
    if (tomorrow.main?.temp_min < 0) {
      warnings.push('❄️ Frost warning for tomorrow - protect sensitive plants');
    }
    
    if (tomorrow.main?.temp_max > 40) {
      warnings.push('🔥 Extreme heat expected tomorrow - ensure adequate irrigation');
    }
  }
  
  return warnings;
}

// Weather code to description mapping for Open-Meteo
function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Fog',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    95: 'Thunderstorm',
    96: 'Thunderstorm with hail',
    99: 'Thunderstorm with heavy hail'
  };
  return weatherCodes[code] || 'Unknown';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Weather function called with request method:', req.method);
    const requestBody = await req.json();
    console.log('Request body received:', requestBody);
    const { lat, lon } = requestBody;
    
    if (!lat || !lon) {
      console.error('Missing coordinates - lat:', lat, 'lon:', lon);
      throw new Error('Latitude and longitude are required');
    }

    console.log('Valid coordinates received - lat:', lat, 'lon:', lon);

    const apiKey = Deno.env.get('WEATHER_API_KEY');
    console.log('API Key status:', apiKey ? 'Found' : 'Not found');
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    if (!apiKey) {
      throw new Error('Weather API key not configured');
    }

    // Fetch current weather from OpenWeatherMap using coordinates directly
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log('Weather API URL (without key):', weatherUrl.replace(apiKey, 'HIDDEN_KEY'));
    console.log('Making request to OpenWeatherMap...');
    
    const weatherResponse = await fetch(weatherUrl);
    console.log('Weather API response status:', weatherResponse.status);

    if (!weatherResponse.ok) {
      const body = await weatherResponse.text();
      console.error('OpenWeatherMap error status:', weatherResponse.status);
      console.error('OpenWeatherMap error body:', body);
      console.error('Coordinates used:', lat, lon);
      console.error('API Key present:', !!apiKey);
      
      if (weatherResponse.status === 401) {
        throw new Error(`Weather API authentication failed. Please check your API key configuration.`);
      } else if (weatherResponse.status === 404) {
        throw new Error(`City '${cityName}' not found. Please try a different location.`);
      } else {
        throw new Error(`Weather service temporarily unavailable (${weatherResponse.status}). Please try again later.`);
      }
    }

    const weatherData = await weatherResponse.json();
    console.log('Weather data received:', JSON.stringify(weatherData, null, 2));

    // Fetch 5-day forecast using coordinates
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const forecastResponse = await fetch(forecastUrl);
    
    let forecastData = null;
    if (forecastResponse.ok) {
      forecastData = await forecastResponse.json();
    }
    
    
    // Get crop recommendations
    console.log('Getting crop recommendations...');
    const cropRecommendations = getCropRecommendations(weatherData, forecastData?.list || []);
    console.log('Crop recommendations:', cropRecommendations);
    
    // Get weather warnings
    console.log('Getting weather warnings...');
    const warnings = getWeatherWarnings(weatherData, forecastData?.list || []);
    console.log('Weather warnings:', warnings);

    console.log('Building response object...');
    const response = {
      location: `${weatherData.name}, ${weatherData.sys.country}`,
      current: {
        temperature: Math.round(weatherData.main.temp),
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        feelsLike: Math.round(weatherData.main.feels_like),
        pressure: weatherData.main.pressure,
        uvIndex: 0, // Would need separate UV API call
        visibility: weatherData.visibility / 1000 // Convert to km
      },
      forecast: forecastData ? forecastData.list.slice(0, 7).map((item: any) => ({
        date: new Date(item.dt * 1000).toLocaleDateString(),
        tempMax: Math.round(item.main.temp_max),
        tempMin: Math.round(item.main.temp_min),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        precipitation: item.rain?.['3h'] || 0
      })) : [],
      cropRecommendations,
      warnings
    };

    console.log('Response object built successfully:', JSON.stringify(response, null, 2));

    console.log('Returning successful response');
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in weather function:', error);
    console.error('Error stack:', error.stack);
    console.error('Error message:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});