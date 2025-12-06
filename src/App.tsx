import MeteoCard from "./components/MeteoCard"
import MeteoNextHours from "./components/MeteoNextHours"
import MeteoNextDays from "./components/MeteoNextDays"

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import type MeteoInterface from "./interfaces/MeteoInterface";
import weatherService from "./services/WeatherService";
import type { FutureForecast } from "./interfaces/FutureWeatherInterface";
import type { DailyForecast } from "./interfaces/DailyForecast";

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
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="flex justify-center mt-5">
        <h1>Météo</h1>
      </div>
      <section className="flex justify-center mt-10">
        <div className={`bg-color-default w-90 h-15 rounded-xl flex items-center justify-center gap-4 shadow-lg ease-in-out duration-75 ${isFocused ? 'scale-95' : 'scale-100'}`}>
            <FaMagnifyingGlass className="cursor-pointer" onClick={handleButtonResearch}/>
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
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
      <section className="flex justify-center">
        <MeteoNextHours futureMeteo={futureMeteo}/>        
      </section>
    </>
  )
}

export default App
