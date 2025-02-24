require("dotenv").config();
const fs = require("fs");
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");

// retrieve environment variables
const predictionKey = process.env["VISION_PREDICTION_KEY"];
const predictionEndpoint = process.env["VISION_PREDICTION_ENDPOINT"];
const projectId = process.env["VISION_PROJECT_ID"];

const publishIterationName = "Iteration1";

const predictor_credentials = new msRest.ApiKeyCredentials({
  inHeader: { "Prediction-key": predictionKey },
});
const predictor = new PredictionApi.PredictionAPIClient(
  predictor_credentials,
  predictionEndpoint
);

const identifyVehicleType = async (imageFile) => {
  const { predictions } = await predictor.classifyImage(
    projectId,
    publishIterationName,
    imageFile
  );

  // Returns the vehicleType with the highest probability
  const { tagName: vehicleType } = predictions.reduce((highest, current) => {
    return current.probability > highest.probability ? current : highest;
  }, predictions[0]);

  return vehicleType;
};

module.exports = { identifyVehicleType };
