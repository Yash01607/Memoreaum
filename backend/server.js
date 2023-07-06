import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/PostsRoutes.js';
import path from 'path';
import http from 'http';

import userRouter from './routes/UserRoutes.js';

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL).catch((error) => console.log(error.message));

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    origin: [
      'https://memoreaum.onrender.com',
      'http://localhost:3001',
      'http://localhost:3000',
    ],
  })
);
app.use('/api/posts', postRoutes);
app.use('/api/user', userRouter);

const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const httpServer = http.Server(app);

httpServer.listen(process.env.PORT || 3000, () => {
  console.log(`Server start at port ${process.env.PORT || 3000}`);
});
