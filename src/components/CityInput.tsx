import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";

const CityInput = () => {

    const [isFocused, setIsFocused] = useState(false);

    return(
        <div className={`bg-color-default w-90 h-15 rounded-xl flex items-center justify-center gap-4 shadow-lg ease-in-out duration-75 ${isFocused ? 'scale-95' : 'scale-100'}`}>
            <FaMagnifyingGlass />
            <input
                type="text"
                placeholder="Ville..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="h-10 w-70 outline-none"
            />
        </div>
    )
}

export default CityInput