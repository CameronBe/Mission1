import "./VehicleImageUploader.css";
import { useState } from "react";

const VehicleImageUploader = () => {
  const [vehiclePreview, setVehiclePreview] = useState("");
  const [vehicleType, setVehicleType] = useState(
    "upload vehicle image first, to indentify vehicle type"
  );
  const [isIndentifyingVehicleType, setIsIndentifyingVehicleType] =
    useState(false);

  const handleVehicleImageUpload = async (e) => {
    setIsIndentifyingVehicleType(true);
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
    setIsIndentifyingVehicleType(false);
  };

  return (
    <>
      <form>
        <input type="file" id="upload" onChange={handleVehicleImageUpload} />
        <div className="vehiclePreviewBox">
          {vehiclePreview && (
            <img
              className="vehiclePreview"
              src={vehiclePreview}
              alt="Vehicle preview"
            />
          )}
        </div>
      </form>

      <p>
        <b>Vehicle Type:</b>{" "}
        {isIndentifyingVehicleType
          ? "indentifying vehicle type..."
          : vehicleType}
      </p>
    </>
  );
};

export default VehicleImageUploader;
