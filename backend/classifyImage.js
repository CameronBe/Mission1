require("dotenv").config();
const fs = require("fs");
const PredictionApi = require("@azure/cognitiveservices-customvision-prediction");
const msRest = require("@azure/ms-rest-js");

// retrieve environment variables
const predictionKey = process.env["VISION_PREDICTION_KEY"];
const predictionEndpoint = process.env["VISION_PREDICTION_ENDPOINT"];
const projectId = process.env["VISION_PROJECT_ID"];

const publishIterationName = "classifyModel";

const predictor_credentials = new msRest.ApiKeyCredentials({
  inHeader: { "Prediction-key": predictionKey },
});
const predictor = new PredictionApi.PredictionAPIClient(
  predictor_credentials,
  predictionEndpoint
);

const classifyImage = async () => {
  const testFile = fs.readFileSync("images/test/test_image.png");

  const results = await predictor.classifyImage(
    projectId,
    publishIterationName,
    testFile
  );

  // Show results
  console.log("Results:");
  results.predictions.forEach((predictedResult) => {
    console.log(
      `\t ${predictedResult.tagName}: ${(
        predictedResult.probability * 100.0
      ).toFixed(2)}%`
    );
  });
};

module.exports = { classifyImage };
