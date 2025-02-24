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

const classifyImage = async (test_image_number) => {
  const testFile = fs.readFileSync(
    `images/test/test_image_${test_image_number}.jpg`
  );

  const results = await predictor.classifyImage(
    projectId,
    publishIterationName,
    testFile
  );

  return results;
};

module.exports = { classifyImage };
