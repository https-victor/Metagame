const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const keys = require("./keys.js");

// Database
const database = require("./database/index");
// Test DB
database
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: ", err));

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, keys.URI)));

// Users routes
app.use("/api/users", require("./routes/users"));

// Campaigns routes
app.use("/api/campaigns", require("./routes/campaigns"));

// Website
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, keys.URI + "/index.html"))
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
