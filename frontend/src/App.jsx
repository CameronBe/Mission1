import "./App.css";
import { useState } from "react";

function App() {
  const [imagePreview, setImagePreview] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("imageFile", file);

    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setVehicleType(data.vehicleType);
  };

  return (
    <div>
      <h1>Home</h1>

      <form>
        <input type="file" onChange={handleFileUpload} />
        {imagePreview && (
          <img src={imagePreview} alt="Image preview of a vehicle" />
        )}
      </form>

      <p>Vehicle type: {vehicleType}</p>
    </div>
  );
}

export default App;
