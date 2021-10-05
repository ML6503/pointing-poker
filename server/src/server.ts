import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import socketServer from './socket/socketController';
import roomContoller from './roomServices/roomController';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const httpServer = createServer(app);
app.use(cors());

socketServer(httpServer);
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`<h1>Hello from server</h1>`);
});

// app.post('/', (req, res) => {
//   const data = req.body.data;

//   res.status(201).json(data);
// });

app.get('/rooms', (req, res) => {
  const rooms = roomContoller.getRoomsInfo();
  console.log('ROOMS', rooms);
  if (rooms.length) {
    res.status(200).json(rooms);
  } else {
    res.status(200).json('No rooms found');
  }
});

app.get('/chats/:room', (req, res) => {
  const room = req.params.room;
  const chat = roomContoller.getRoomChat(room);
  return res.status(200).json(chat);
});

app.get('/users/:room', (req, res) => {
  const roomId = req.params.room;
  const room = roomContoller.getRoomId(roomId);
  if (room) {
    const users = roomContoller.getRoomUsers(roomId);
    if (users.length) {
      res.status(200).json(users);
    } else {
      res.status(200).json('No users found');
    }
  } else res.status(404).json('No room found');
});

app.post('/rooms', (req, res) => {
  const { data } = req.body;
  roomContoller.createRoom(data);
  res.status(201).json('created');
});

app.get('/gamestart/:room', (req, res) => {
  const roomId = req.params.room;
  const room = roomContoller.getRoomId(roomId);
  if (room) {
    const gameInitData = roomContoller.getGameInitData(room);
    if (gameInitData) {
      res.status(200).json(gameInitData);
    } else res.status(200).json('No gameInitData');
  } else res.status(404).json('No room found');
});

app.post('/gamestart/:room', (req, res) => {
  const room = req.params.room;
  roomContoller.gameInit(room, req.body);
  res.status(201).json('created');
});

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
