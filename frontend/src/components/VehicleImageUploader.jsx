import { useState } from "react";

const VehicleImageUploader = () => {
  const [vehiclePreview, setVehiclePreview] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const handleVehicleImageUpload = async (e) => {
    const vehicleImage = e.target.files[0];
    setVehiclePreview(URL.createObjectURL(vehicleImage));

    const formData = new FormData();
    formData.append("vehicleImage", vehicleImage);

    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      body: formData,
    });

    const vehicleData = await response.json();
    setVehicleType(vehicleData.vehicleType);
  };

  return (
    <>
      <h1>Home</h1>

      <form>
        <input type="file" onChange={handleVehicleImageUpload} />
        {vehiclePreview && <img src={vehiclePreview} alt="Vehicle preview" />}
      </form>

      <p>Vehicle type: {vehicleType}</p>
    </>
  );
};

export default VehicleImageUploader;
