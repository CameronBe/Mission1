const { identifyVehicleType } = require("./indentifyVehicleType");

const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/", upload.single("vehicleImage"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file was uploaded.");
  }

  const vehicleType = await identifyVehicleType(req.file.buffer);

  res.json({
    vehicleType,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
