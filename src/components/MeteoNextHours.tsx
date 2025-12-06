import type { FutureForecast } from "../interfaces/FutureWeatherInterface";
import { getWeatherIcon } from "../utils/WeatherIcons";

const MeteoNextHours = ({ futureMeteo }: { futureMeteo: FutureForecast[] | null }) => {
    return (
        <div className="bg-color-default w-285 rounded-3xl mt-5 shadow-lg h-45 flex justify-center items-center gap-12">
            {futureMeteo?.slice(0, 10).map((meteo: FutureForecast, index: number) => {
                const WeatherIcon = getWeatherIcon(meteo.description);

                return (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <h4 className="font-semibold">{meteo.temperature}°C</h4>

                        <WeatherIcon 
                            size={50} 
                            className="text-gray-400 hover:rotate-45 transition-transform duration-300" 
                        />

                        <h3 className="font-semibold">
                            {meteo.date.getHours()}h
                        </h3>
                    </div>
                );
            })}
        </div>
    );
};

export default MeteoNextHours;
