const { identifyVehicleType } = require("./indentifyVehicleType");

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post("/", multer().single("vehicleImage"), async ({ file }, res) => {
  if (!file) {
    return res.status(400).send("No file was uploaded.");
  }

  const vehicleType = await identifyVehicleType(file.buffer);

  res.json({
    vehicleType,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
