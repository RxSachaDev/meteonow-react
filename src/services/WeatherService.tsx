import type MeteoInterface from "../intefaces/MeteoInterface";

// Interface pour la réponse de l'API OpenWeatherMap
interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

// Classe pour gérer le cache
class WeatherCache {
  private cache: Map<string, { data: MeteoInterface; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  contains(city: string): boolean {
    const cached = this.cache.get(city.toLowerCase());
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return true;
    }
    // Supprimer du cache si expiré
    if (cached) {
      this.cache.delete(city.toLowerCase());
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

  add(city: string, data: MeteoInterface): void {
    this.cache.set(city.toLowerCase(), {
      data,
      timestamp: Date.now()
    });
  }

  clear(): void {
    this.cache.clear();
  }
}

// Classe principale WeatherService
class WeatherService {
  private cache: WeatherCache;
  private apiKey: string;
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  constructor() {
    this.cache = new WeatherCache();
    // Récupérer la clé API depuis les variables d'environnement
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
    
    return `${this.BASE_URL}?${params.toString()}`;
  }

  private async getWeatherJson(city: string): Promise<OpenWeatherResponse | null> {
    try {
      const url = this.getWeatherURI(city);
      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        return null;
      }

      const json: OpenWeatherResponse = await response.json();
      return json;
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
      return null;
    }
  }

  public async getWeather(city: string): Promise<MeteoInterface | null> {
    // Vérifier d'abord le cache
    if (this.cache.contains(city)) {
      console.log(`Données récupérées du cache pour: ${city}`);
      return this.cache.get(city);
    }

    // Si pas dans le cache, appeler l'API
    const json = await this.getWeatherJson(city);

    if (json) {
      // Extraire les données nécessaires
      const temperature = Math.round((json.main.temp) * 10) / 10;
      const description = json.weather[0].description;
      const humidity = json.main.humidity;
      const windSpeed = Math.round(json.wind.speed * 3.6); // m/s vers km/h
      const icon = json.weather[0].icon;
      const cityName = json.name;

      // Créer l'objet WeatherData
      const weatherData: MeteoInterface = {
        city: cityName,
        temperature: temperature,
        description: description,
        humidity: humidity,
        windspeed: windSpeed,
        date: new Date()
      };

      // Ajouter au cache
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
}

// Exporter une instance unique (Singleton)
const weatherService = new WeatherService();
export default weatherService;