require("dotenv").config();
const util = require("util");
const fs = require("fs");
const TrainingApi = require("@azure/cognitiveservices-customvision-training");
const msRest = require("@azure/ms-rest-js");

// retrieve environment variables
const trainingKey = process.env["VISION_TRAINING_KEY"];
const trainingEndpoint = process.env["VISION_TRAINING_ENDPOINT"];
const predictionResourceId = process.env["VISION_PREDICTION_RESOURCE_ID"];

const publishIterationName = "classifyModel";
const setTimeoutPromise = util.promisify(setTimeout);

const credentials = new msRest.ApiKeyCredentials({
  inHeader: { "Training-key": trainingKey },
});
const trainer = new TrainingApi.TrainingAPIClient(
  credentials,
  trainingEndpoint
);

(async () => {
  console.log("Creating project...");
  const sampleProject = await trainer.createProject("Sample Project");

  const sedanTag = await trainer.createTag(sampleProject.id, "sedan");
  const suvTag = await trainer.createTag(sampleProject.id, "suv");
  const truckTag = await trainer.createTag(sampleProject.id, "truck");

  const sampleDataRoot = "images";

  console.log("Adding images...");
  let fileUploadPromises = [];

  const sedanDir = `${sampleDataRoot}/sedan`;
  const sedanFiles = fs.readdirSync(sedanDir);
  sedanFiles.forEach((file) => {
    fileUploadPromises.push(
      trainer.createImagesFromData(
        sampleProject.id,
        fs.readFileSync(`${sedanDir}/${file}`),
        { tagIds: [sedanTag.id] }
      )
    );
  });

  const suvDir = `${sampleDataRoot}/suv`;
  const suvFiles = fs.readdirSync(suvDir);
  suvFiles.forEach((file) => {
    fileUploadPromises.push(
      trainer.createImagesFromData(
        sampleProject.id,
        fs.readFileSync(`${suvDir}/${file}`),
        { tagIds: [suvTag.id] }
      )
    );
  });

  const truckDir = `${sampleDataRoot}/truck`;
  const truckFiles = fs.readdirSync(truckDir);
  truckFiles.forEach((file) => {
    fileUploadPromises.push(
      trainer.createImagesFromData(
        sampleProject.id,
        fs.readFileSync(`${truckDir}/${file}`),
        { tagIds: [truckTag.id] }
      )
    );
  });

  await Promise.all(fileUploadPromises);

  console.log("Training...");
  let trainingIteration = await trainer.trainProject(sampleProject.id);

  // Wait for training to complete
  console.log("Training started...");
  while (trainingIteration.status == "Training") {
    console.log("Training status: " + trainingIteration.status);
    await setTimeoutPromise(1000, null);
    trainingIteration = await trainer.getIteration(
      sampleProject.id,
      trainingIteration.id
    );
  }
  console.log("Training status: " + trainingIteration.status);

  // Publish the iteration to the end point
  await trainer.publishIteration(
    sampleProject.id,
    trainingIteration.id,
    publishIterationName,
    predictionResourceId
  );

  console.log("Iteration successfully published.");
})();
