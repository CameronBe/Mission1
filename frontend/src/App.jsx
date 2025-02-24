import "./App.css";
import { useState } from "react";

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("imageFile", imageFile);

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
        <input type="file" onChange={handleFileChange} />
        {imagePreview && (
          <img src={imagePreview} alt="Image preview of a vehicle" />
        )}
        <button onClick={handleFileUpload}>Upload</button>
      </form>

      <p>Vehicle type: {vehicleType}</p>
    </div>
  );
}

export default App;
