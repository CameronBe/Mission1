import "./VehicleImageUploader.css";
import { useState } from "react";

const VehicleImageUploader = () => {
  const [vehiclePreview, setVehiclePreview] = useState("");
  const [vehicleType, setVehicleType] = useState("...");
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
      <div className="vehicleCard">
        <div className="vehiclePreviewBox">
          {vehiclePreview && (
            <img
              className="vehiclePreview"
              src={vehiclePreview}
              alt="Vehicle preview"
            />
          )}
        </div>

        <div>
          <h2 className="vehicleTypeTitle">Vehicle Type</h2>
          <p className="vehicleTypeText">
            {isIndentifyingVehicleType ? "indentifying..." : vehicleType}
          </p>
        </div>
      </div>

      <form className="vehicleImageForm">
        <label className="vehicleImageLabel" htmlFor="vehicleImageInput">
          UPLOAD
        </label>
        <input
          id="vehicleImageInput"
          className="vehicleImageInput"
          type="file"
          onChange={handleVehicleImageUpload}
        />
      </form>
    </>
  );
};

export default VehicleImageUploader;
