// Import dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const http = require('http');
const io = require('socket.io');


// Import custom middleware and routes
const { errorHandler, notFoundError } = require('./middleware/error-handler');
const eventRoutes = require('./routes/eventRoutes');
const projectRoutes = require('./routes/project');
const socketRouter = require('./routes/socketRouter');

// Initialize app and server
const app = express();
const server = http.createServer(app);
const socketServer = io(server, { cors: { origin: '*' } });

// MongoDB connection
mongoose.connect('mongodb+srv://gammoudihoussem:housam972000@cluster0.thaxeiv.mongodb.net/')
  .then(() => console.log(`Connected to 'localtest' database`))
  .catch((err) => console.error(err));

// Global configurations
const PORT = process.env.PORT || 9090;

// Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static file serving
// Static file serving
app.use('/uploads', express.static('uploads', { storage: multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + '-' + file.originalname);
    }
  }) }));
  
  app.use('/img', express.static('public/images'));
  

// Routing
app.use('/api/projects', projectRoutes);
app.use('/event', eventRoutes);

// Socket.io routes
app.use('/api/v1', socketRouter(socketServer));

// Error handling
app.use(notFoundError);
app.use(errorHandler);

// Socket events
socketServer.on('connection', (socket) => {
  console.log(socket.id);

  socket.on('mod_forecast', (count) => {
    console.log(`Received mod_forecast event with count: ${count}`);
    socketServer.emit('mod_forecast', count);
  });
});

// Server startup
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
socketServer.listen(3001, () => console.log('Socket server running on port 3001'));
