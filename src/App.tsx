import MeteoCard from "./components/MeteoCard"
import MeteoNextHours from "./components/MeteoNextHours"

function App() {

  return (
    <>
      <div className="flex justify-center">
        <h1>Météo</h1>
      </div>
      <section className="flex gap-6 justify-center mt-15" >
        <MeteoCard />
        <MeteoNextHours />
      </section>
    </>
  )
}

export default App
