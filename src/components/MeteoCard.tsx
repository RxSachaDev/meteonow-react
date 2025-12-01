import type MeteoInterface from "../intefaces/MeteoInterface"

const MeteoCard = ({ meteo }: { meteo: MeteoInterface | null}) => {

    const capitalize = (text: string) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    return (
        <div className="relative w-80 rounded-3xl overflow-hidden shadow-lg">
            {/* Image de fond */}
            <div className="absolute inset-0 bg-[url('./assets/background/fond_neige.jpg')] bg-cover bg-center" />
            
            {/* Voile gris par-dessus */}
            <div className="absolute inset-0 bg-gray-100/50" />
            
            {/* Contenu par-dessus le voile */}
            {meteo ? 
            
            <div className="relative z-10 py-5 px-7">
                <h3 className="font-bold">{meteo.city}</h3>
                <h2 className="font-bold">{meteo.temperature}°C</h2>
                <p>Vent : {meteo.windspeed} km/h</p>
                <p>Humidité : {meteo.humidity}%</p>
                <h4 className="font-semibold">{capitalize(meteo.description)}</h4>
            </div> :
            <div className="relative z-10 py-5 px-7">
                <h3 className="font-bold">Aucun</h3>
                <h2 className="font-bold">0°C</h2>
                <p>Vent : 0 km/h</p>
                <p>Humidité : 0%</p>
                <h4 className="font-semibold">Aucun</h4>
            </div>
            }
        </div>
    )
}   

export default MeteoCard