import type { DailyForecast } from "../interfaces/DailyForecast";
import type { 
  ForecastResponse, 
  ForecastItem, 
  ForecastMain, 
  ForecastWeather, 
  CityInfo 
} from "../interfaces/FutureWeatherInterface";
import type MeteoInterface from "../interfaces/MeteoInterface";
import type WeatherResponse from "../interfaces/WeatherResponseInterface";

// Interface pour les prévisions futures formatées
export interface FutureForecast {
  date: Date;
  temperature: number;
  description: string;
}

// Classe pour gérer le cache
class WeatherCache {
  private cache: Map<string, { data: MeteoInterface; timestamp: number }> = new Map();
  private forecastCache: Map<string, { data: FutureForecast[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  contains(city: string): boolean {
    const cached = this.cache.get(city.toLowerCase());
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return true;
    }
    if (cached) {
      this.cache.delete(city.toLowerCase());
    }
    return false;
  }

  containsForecast(city: string): boolean {
    const cached = this.forecastCache.get(city.toLowerCase());
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return true;
    }
    if (cached) {
      this.forecastCache.delete(city.toLowerCase());
    }
    return false;
  }

  get(city: string): MeteoInterface | null {
    const cached = this.cache.get(city.toLowerCase());
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  getForecast(city: string): FutureForecast[] | null {
    const cached = this.forecastCache.get(city.toLowerCase());
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  add(city: string, data: MeteoInterface): void {
    this.cache.set(city.toLowerCase(), {
      data,
      timestamp: Date.now()
    });
  }

  addForecast(city: string, data: FutureForecast[]): void {
    this.forecastCache.set(city.toLowerCase(), {
      data,
      timestamp: Date.now()
    });
  }

  clear(): void {
    this.cache.clear();
    this.forecastCache.clear();
  }
}

// Classe principale WeatherService
class WeatherService {
  private cache: WeatherCache;
  private apiKey: string;
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/';

  constructor() {
    this.cache = new WeatherCache();
    this.apiKey = import.meta.env.VITE_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('API_KEY manquante dans les variables d\'environnement');
    }
  }

  private getWeatherURI(city: string): string {
    const params = new URLSearchParams({
      q: city,
      appid: this.apiKey,
      units: 'metric', 
      lang: 'fr' 
    });
    
    return `${this.BASE_URL}weather?${params.toString()}`;
  }

  private async getWeatherJson(city: string): Promise<WeatherResponse | null> {
    try {
      const url = this.getWeatherURI(city);
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        return null;
      }

      const json: WeatherResponse = await response.json();
      return json;
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
      return null;
    }
  }

  public async getWeather(city: string): Promise<MeteoInterface | null> {
    if (this.cache.contains(city)) {
      console.log(`Données récupérées du cache pour: ${city}`);
      return this.cache.get(city);
    }

    const json = await this.getWeatherJson(city);

    if (json) {
      const temperature = Math.round((json.main.temp) * 10) / 10;
      const description = json.weather[0].description;
      const humidity = json.main.humidity;
      const windSpeed = Math.round(json.wind.speed * 3.6);
      const cityName = json.name;

      const weatherData: MeteoInterface = {
        city: cityName,
        temperature: temperature,
        description: description,
        humidity: humidity,
        windspeed: windSpeed,
        date: new Date()
      };

      this.cache.add(city, weatherData);
      return weatherData;
    }

    return null;
  }

  public clearCache(): void {
    this.cache.clear();
    console.log('Cache vidé');
  }

  public getCacheSize(): number {
    return this.cache['cache'].size;
  }

  private getFutureWeatherURI(city: string): string {
    const params = new URLSearchParams({
      q: city,
      appid: this.apiKey,
      units: 'metric',
      lang: 'fr'
    });
    return `${this.BASE_URL}forecast?${params.toString()}`;
  }

  private async getFutureWeatherJson(city: string): Promise<ForecastResponse | null> {
    try {
      const url = this.getFutureWeatherURI(city);
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        return null;
      }

      const json: ForecastResponse = await response.json();
      return json;
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo future:', error);
      return null;
    }
  }

  private formatForecastItem(item: ForecastItem): FutureForecast {
    return {
      date: new Date(item.dt * 1000),
      temperature: Math.round(item.main.temp * 10) / 10,
      description: item.weather[0].description
    };
  }

  public async getFutureWeather(city: string): Promise<FutureForecast[] | null> {
    // Vérifier le cache
    if (this.cache.containsForecast(city)) {
      console.log(`Prévisions récupérées du cache pour: ${city}`);
      return this.cache.getForecast(city);
    }

    const json = await this.getFutureWeatherJson(city);

    if (json && json.list) {
      // Transformer les données en format utilisable
      const forecasts: FutureForecast[] = json.list.map(item => 
        this.formatForecastItem(item)
      );

      // Ajouter au cache
      this.cache.addForecast(city, forecasts);

      return forecasts;
    }

    return null;
  }

  // Méthode utilitaire pour obtenir les prévisions par jour
  public async getDailyForecasts(city: string): Promise<Map<string, FutureForecast[]> | null> {
    const forecasts = await this.getFutureWeather(city);
    
    if (!forecasts) return null;

    // Grouper par jour
    const dailyMap = new Map<string, FutureForecast[]>();
    
    forecasts.forEach(forecast => {
      const dateKey = forecast.date.toLocaleDateString('fr-FR');
      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, []);
      }
      dailyMap.get(dateKey)!.push(forecast);
    });

    return dailyMap;
  }

  // Méthode pour obtenir les informations de la ville depuis les prévisions
  public async getCityInfo(city: string): Promise<CityInfo | null> {
    const json = await this.getFutureWeatherJson(city);
    return json?.city || null;
  }

  public async getDailyForecastsWithMinMax(city: string): Promise<DailyForecast[] | null> {
    const forecasts = await this.getFutureWeather(city);
    
    if (!forecasts) return null;

    // Grouper par jour
    const dailyMap = new Map<string, FutureForecast[]>();
    
    forecasts.forEach(forecast => {
      const dateKey = forecast.date.toLocaleDateString('fr-FR');
      if (!dailyMap.has(dateKey)) {
        dailyMap.set(dateKey, []);
      }
      dailyMap.get(dateKey)!.push(forecast);
    });

    // Calculer min/max pour chaque jour
    const dailyForecasts: DailyForecast[] = [];
    
    dailyMap.forEach((dayForecasts, dateKey) => {
      const temperatures = dayForecasts.map(f => f.temperature);
      const tempMin = Math.min(...temperatures);
      const tempMax = Math.max(...temperatures);
      
      // Trouver la description la plus fréquente
      const descriptions = dayForecasts.map(f => f.description);
      const descriptionCount = new Map<string, number>();
      descriptions.forEach(desc => {
        descriptionCount.set(desc, (descriptionCount.get(desc) || 0) + 1);
      });
      const mostFrequentDescription = Array.from(descriptionCount.entries())
        .sort((a, b) => b[1] - a[1])[0][0];

      dailyForecasts.push({
        date: dayForecasts[0].date,
        tempMin: Math.round(tempMin * 10) / 10,
        tempMax: Math.round(tempMax * 10) / 10,
        description: mostFrequentDescription
      });
    });

    return dailyForecasts;
  }
}


// Exporter une instance unique (Singleton)
const weatherService = new WeatherService();
export default weatherService;