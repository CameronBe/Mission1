const { identifyVehicleType } = require("./indentifyVehicleType");

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/", async ({ body: { test_image_number } }, res) => {
  const vehicleType = await identifyVehicleType(test_image_number);

  res.json({
    vehicleType,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
