import MeteoCard from "./components/MeteoCard"
import MeteoNextHours from "./components/MeteoNextHours"
import MeteoNextDays from "./components/MeteoNextDays"

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import type MeteoInterface from "./interfaces/MeteoInterface";
import weatherService from "./services/WeatherService";
import type { FutureForecast } from "./interfaces/FutureWeatherInterface";
import type { DailyForecast } from "./interfaces/DailyForecast";
import { getWeatherVideo } from "./utils/WeatherVideo";


function App() {

  const [isFocused, setIsFocused] = useState(false);
  const [meteoData, setMeteoData] = useState<MeteoInterface | null>(null);
  const [city, setCity] = useState<string>("")
  const [futureMeteo, setFutureMeteo] = useState<FutureForecast[] | null>(null)
  const [dailyForecasts, setDailyForecast] = useState<DailyForecast[] | null>(null)
  
  const handleButtonResearch = async () => {
    if (!city.trim()) {
      return;
    }

    try {
      const data = await weatherService.getWeather(city);
      const data2 = await weatherService.getFutureWeather(city)
      const data3 = await weatherService.getDailyForecastsWithMinMax(city)

      console.log(data)
      if (data && data2 && data3) {
        setMeteoData(data);
        setFutureMeteo(data2)
        setDailyForecast(data3)
      } else {
        setMeteoData(null);
        setFutureMeteo(null);
        setDailyForecast(null);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonResearch();
    }
  }

  // Obtenir l'URL de la vidéo en fonction de la description météo
  const videoUrl = meteoData ? getWeatherVideo(meteoData.description) : null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Vidéo en arrière-plan */}
      {videoUrl && (
        <video
          key={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="fixed top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}
      
      {/* Overlay sombre pour améliorer la lisibilité */}
      {videoUrl && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 -z-10"></div>
      )}

      {/* Contenu principal */}
      <div className="relative z-10">
        <div className="flex justify-center mt-5">
          <h1 className="text-white font-bold drop-shadow-lg">Météo</h1>
        </div>
        <section className="flex justify-center mt-10">
          <div className={`bg-color-default w-90 h-15 rounded-xl flex items-center justify-center gap-4 shadow-lg ease-in-out duration-75 ${isFocused ? 'scale-95' : 'scale-100'}`}>
              <FaMagnifyingGlass className="cursor-pointer" onClick={handleButtonResearch}/>
              <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="City..."
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="h-10 w-70 outline-none"
              />
          </div>
        </section>
        <section className="flex gap-6 justify-center mt-15" >
          <MeteoCard meteo={meteoData}/>
          <MeteoNextDays dailyMeteo={dailyForecasts}/>
        </section>
        <section className="flex justify-center pb-10">
          <MeteoNextHours futureMeteo={futureMeteo}/>        
        </section>
      </div>
    </div>
  )
}

export default App