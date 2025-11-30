import MeteoCard from "./components/MeteoCard"

function App() {

  return (
    <>
      <div className="flex justify-center">
        <h1>Météo</h1>
      </div>
      <section className="flex justify-center mt-15">
        <MeteoCard />
      </section>
    </>
  )
}

export default App
