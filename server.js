const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const ProjectRoute = require('./routes/project');
mongoose.connect('mongodb://127.0.0.1:27017/localtest');
const db = mongoose.connection;
const multer = require('multer');


db.on('error', (err) => {
   console.log(err);
});

db.once('open', () => {
   console.log('Database Connection Established!');
});

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});

app.use('/api/projects', ProjectRoute);
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

// socket Router
const socketRouter = require("./routes/socketRouter")(io);

app.use("/api/v1", socketRouter);

app.set("view engine", "ejs");

app.set(express.urlencoded({ extended: false }));

app.set(express.json());

// landing
app.get("/", (req, res) => {
  res.render("index");
});

// socket connection
io.on("connection", (socket) => {
  console.log(socket.id);
});

server.listen(3001, () => {
  console.log("server is running");
});


io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("mod_forecast", (count) => {
    // Handle the mod_forecast event here
    console.log(`Received mod_forecast event with count: ${count}`);

    // Emit the mod_forecast event
    io.emit("mod_forecast", count);
  });
});
