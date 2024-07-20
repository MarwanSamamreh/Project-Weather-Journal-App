// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 5500;
app.listen(port, () => console.log(`Server is up and running on port ${port}`));

// GET Route
app.get("/all", (req, res) => {
  try {
    res.status(200).json(projectData);
  } catch (error) {
    console.error("Error in GET /all:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST Route
app.post("/postData", (req, res) => {
  try {
    projectData = {
      temp: req.body.temp,
      date: req.body.date,
      feelings: req.body.feelings,
    };
    res.status(201).json(projectData);
  } catch (error) {
    console.error("Error in POST /postData:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
