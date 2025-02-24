const { classifyImage } = require("./classifyImage");

const express = require("express");
const app = express();
const port = 3000;

// Will probably end up making this a post request that is fired in tandem with the submision of a form
app.get("/", async (req, res) => {
  const { predictions } = await classifyImage();

  const highestProbabilityPrediction = predictions.reduce(
    (highest, current) => {
      return current.probability > highest.probability ? current : highest;
    },
    predictions[0]
  );

  res.json({
    type: highestProbabilityPrediction.tagName,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
