const express = require("express");
const path = require("path");
const keys = require("./keys.js");
const bodyParser = require("body-parser");
// const expressStatusMonitor = require("express-status-monitor");
const Pc = require("./models/Pc");

// Database
const database = require("./database/index");
// Test DB
database
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: ", err));

const app = express();
const http = require("http");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, keys.URI)));

// Users routes
app.use("/api/users", require("./routes/users"));

// Auth routes
app.use("/api/auth", require("./routes/auth"));

// Campaigns routes
app.use("/api/campaigns", require("./routes/campaigns"));
app.use("/api/users/:userId/campaigns", require("./routes/campaigns-user.js"));

// Adventures routes
app.use("/api/users/:userId/adventures", require("./routes/adventures.js"));

// PCs routes
app.use("/api/pcs", require("./routes/pcs"));
app.use("/api/users/:userId/pcs", require("./routes/pcs-user"));

// Website
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, keys.URI + "/index.html"))
);
const server = http.Server(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, console.log(`Server started on port ${PORT}`));

const io = require("socket.io").listen(server);

io.origins(["*:*"]);

app.set("socketIo", io);

io.on("connection", (socket) => {
  console.log(`Connected socket: ${socket.id}`);
  socket.on("getPcData", async function(data, callback) {
    try {
      const pc = await Pc.findByPk(data.pcId);
      if (!pc) {
        console.log("Player Character not found");
      }
      callback(pc);
    } catch (err) {
      console.log("Error", err);
    }
  });
});
