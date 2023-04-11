import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoConnect from './src/config/db.js';
import { login, logout, register } from './src/controllers/userController.js';
import userRouter from './src/routers/userRouter.js';
import bmiRouter from './src/routers/bmiRouter.js';
import auth from './src/middleware/authMiddleware.js';

// Configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

//home route
app.get('/', (req, res) => {
  res.send('Home Route');
});

//Auth Routes
app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/logout', auth, logout);

//User Routes
app.use('/api/user', userRouter);

//BMI Routes
app.use('/api/bmi', bmiRouter);

//Port
const PORT = process.env.PORT || 8000;

//Server Listening
app.listen(PORT, async () => {
  try {
    //connect with mongodb
    await mongoConnect();
    console.log(`server listening on port ${PORT}`);
  } catch (err) {
    console.log('err: ', err);
  }
});
