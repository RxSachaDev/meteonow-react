import MeteoCard from "./components/MeteoCard"
import MeteoNextHours from "./components/MeteoNextHours"
import MeteoNextDays from "./components/MeteoNextDays"

import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";

function App() {

  const [isFocused, setIsFocused] = useState(false);

  const handleButtonResearch = () => {
       
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
                placeholder="City..."
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="h-10 w-70 outline-none"
            />
        </div>
      </section>
      <section className="flex gap-6 justify-center mt-15" >
        <MeteoCard />
        <MeteoNextDays />
      </section>
      <section className="flex justify-center">
        <MeteoNextHours />        
      </section>
    </>
  )
}

export default App
