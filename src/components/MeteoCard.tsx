import type MeteoInterface from "../interfaces/MeteoInterface";
import { getWeatherIcon } from "../utils/WeatherIcons";

const MeteoCard = ({ meteo }: { meteo: MeteoInterface | null }) => {
    const capitalize = (text: string) =>
        text.charAt(0).toUpperCase() + text.slice(1);

    // 👉 On déclare l'icône avant le return
    const WeatherIcon = meteo ? getWeatherIcon(meteo.description) : null;

    return (
        <div className="w-80 rounded-3xl overflow-hidden shadow-lg bg-color-default">
            {meteo ? (
                <div className="py-5 px-7 flex gap-5 items-center">
                    <div>
                        <h3 className="font-bold">{meteo.city}</h3>
                        <h2 className="font-bold">{meteo.temperature}°C</h2>
                        <p>Vent : {meteo.windspeed} km/h</p>
                        <p>Humidité : {meteo.humidity}%</p>
                        <h4 className="font-semibold">
                            {capitalize(meteo.description)}
                        </h4>
                    </div>

                    {WeatherIcon && (
                        <WeatherIcon
                            size={150}
                            className="text-gray-400 hover:rotate-45 transition-transform duration-300"
                        />
                    )}
                </div>
            ) : (
                <div className="z-10 py-5 px-7">
                    <h3 className="font-bold">Aucun</h3>
                    <h2 className="font-bold">0°C</h2>
                    <p>Vent : 0 km/h</p>
                    <p>Humidité : 0%</p>
                    <h4 className="font-semibold">Aucun</h4>
                </div>
            )}
        </div>
    );
};

export default MeteoCard;
