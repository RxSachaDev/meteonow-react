import type { DailyForecast } from "../interfaces/DailyForecast";
import { getWeatherIcon } from "../utils/WeatherIcons";

const MeteoNextDays = ({dailyMeteo} : {dailyMeteo : DailyForecast[] | null}) => {
    
    const getDayName = (date: Date): string => {
        const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        return days[date.getDay()];
    };
    return (
        <div className="bg-color-default w-200 rounded-3xl flex shadow-lg gap-12 justify-center items-center py-6">
            {dailyMeteo?.slice(0, 5).map((meteo: DailyForecast, index: number) => {
                const WeatherIcon = getWeatherIcon(meteo.description);
                return (
                    <div key={index} className="flex flex-col items-center gap-2">
                        <h4 className="font-semibold">
                            {meteo.tempMin}°C / {meteo.tempMax}°C
                        </h4>
                        <WeatherIcon size={50} className="text-gray-400 hover:rotate-45 transition-transform duration-300"/>
                        <h3 className="font-semibold">{getDayName(meteo.date)}</h3>
                    </div>
                );
            })}
        </div>
    )
}

export default MeteoNextDays