import MeteoCard from "./components/MeteoCard"
import MeteoNextHours from "./components/MeteoNextHours"
import MeteoNextDays from "./components/MeteoNextDays"
import CityInput from "./components/CityInput"

function App() {

  return (
    <>
      <div className="flex justify-center mt-5">
        <h1>Météo</h1>
      </div>
      <section className="flex justify-center mt-10">
        <CityInput />
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
