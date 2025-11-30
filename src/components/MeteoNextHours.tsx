import { FaSun } from "react-icons/fa6";

const MeteoNextHours = () => {
    return (
        <div className="bg-color-default w-140 rounded-3xl flex shadow-lg gap-12 justify-center items-center">
            <div className="flex flex-col items-center gap-2">
                <h4 className="font-semibold">21°C</h4>
                <FaSun size={40} className="text-gray-400"/>
                <h3 className="font-semibold">12:00</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
                <h4 className="font-semibold">23°C</h4>
                <FaSun size={40} className="text-gray-400"/>
                <h3 className="font-semibold">8:00</h3>
            </div>
            <div className="flex flex-col items-center gap-2">
                <h4 className="font-semibold">22°C</h4>
                <FaSun size={40} className="text-gray-400"/>
                <h3 className="font-semibold">18:00</h3>
            </div>
        </div>
    )
}

export default MeteoNextHours