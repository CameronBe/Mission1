import "./App.css";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import VehicleImageUploader from "./components/vehicleImageUploader/VehicleImageUploader";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <VehicleImageUploader />
    </div>
  );
}

export default App;
