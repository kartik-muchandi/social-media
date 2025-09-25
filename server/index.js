require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SocketServer = require('./socketServer');
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Correct CORS config for credentials
app.use(cors({
  origin: "http://localhost:3000", // your React frontend URL
  credentials: true
}));

//#region // !Socket
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', socket => {
  SocketServer(socket);
});
//#endregion

app.get("/", (req, res) => {
  res.send("Hi Welcome to Social Media App API.....");
});

//#region // !Routes
app.use('/api', require('./routes/authRouter'));
app.use('/api', require('./routes/userRouter'));
app.use('/api', require('./routes/postRouter'));
app.use('/api', require('./routes/commentRouter'));
app.use('/api', require('./routes/adminRouter'));
app.use('/api', require('./routes/notifyRouter'));
app.use('/api', require('./routes/messageRouter'));
//#endregion

// MongoDB Connection
const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if (err) throw err;
  console.log("Database Connected!!");
});

// Start server
const port = process.env.PORT || 3001;
http.listen(port, () => {
  console.log("Listening on", port);
});
