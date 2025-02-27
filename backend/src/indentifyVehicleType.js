require("dotenv").config();
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");

const predictionKey = process.env["VISION_PREDICTION_KEY"];
const predictionEndpoint = process.env["VISION_PREDICTION_ENDPOINT"];
const projectId = process.env["VISION_PROJECT_ID"];

const predictor_credentials = new msRest.ApiKeyCredentials({
  inHeader: { "Prediction-key": predictionKey },
});
const predictor = new PredictionApi.PredictionAPIClient(
  predictor_credentials,
  predictionEndpoint
);

const identifyVehicleType = async (vehicleImage) => {
  const { predictions } = await predictor.classifyImage(
    projectId,
    "Iteration2",
    vehicleImage
  );

  // Returns the vehicleType with the highest probability
  const { tagName: vehicleType } = predictions.reduce((highest, current) => {
    return current.probability > highest.probability ? current : highest;
  }, predictions[0]);

  return vehicleType;
};

module.exports = identifyVehicleType;
