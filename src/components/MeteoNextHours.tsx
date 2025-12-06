import { FaSun } from "react-icons/fa6";
import type { FutureForecast } from "../interfaces/FutureWeatherInterface";

const MeteoNextHours = ({futureMeteo} : {futureMeteo : FutureForecast[] | null}) => {
    return (
        <div className="bg-color-default w-225 rounded-3xl mt-5 shadow-lg h-45 flex justify-center items-center gap-12">
            {futureMeteo?.slice(0,8).map((meteo: FutureForecast, index: number) => (
                <div key={index} className="flex flex-col items-center gap-2">
                    <h4 className="font-semibold">{meteo.temperature}°C</h4>
                    <FaSun size={40} className="text-gray-400"/>
                    <h3 className="font-semibold">
                        {meteo.date.getHours()}h
                    </h3>
                </div>
            ))}
        </div>
    )
}

export default MeteoNextHours