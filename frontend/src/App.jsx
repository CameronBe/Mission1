import "./App.css";
import Header from "./components/header/Header";
import VehicleImageUploader from "./components/vehicleImageUploader/VehicleImageUploader";

function App() {
  return (
    <div className="app">
      <Header />
      <h1>Home</h1>
      <VehicleImageUploader />
    </div>
  );
}

export default App;
