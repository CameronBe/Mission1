import "./App.css";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import VehicleImageUploader from "./components/vehicleImageUploader/VehicleImageUploader";

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <VehicleImageUploader />
      <Footer />
    </div>
  );
}

export default App;
