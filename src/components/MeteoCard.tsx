

const MeteoCard = () => {
    return (
        <div className="relative w-80 rounded-3xl overflow-hidden">
            {/* Image de fond */}
            <div className="absolute inset-0 bg-[url('./assets/background/fond_neige.jpg')] bg-cover bg-center" />
            
            {/* Voile gris par-dessus */}
            <div className="absolute inset-0 bg-gray-300/50" />
            
            {/* Contenu par-dessus le voile */}
            <div className="relative z-10 py-5 px-7">
                <h3 className="font-bold">Montréal</h3>
                <h2 className="font-bold">1.38°C</h2>
                <p>Wind : 20 km/h</p>
                <p>Humidity : 10%</p>
                <h4 className="font-semibold">Snowly</h4>
            </div>
        </div>
    )
}   

export default MeteoCard;