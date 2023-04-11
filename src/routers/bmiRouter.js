import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import { bmiCalCulator, getBmiHistory } from '../controllers/bmiController.js';

//create a router
const bmiRouter = Router();

//api endpoints with controller functions
bmiRouter.post('/', auth, bmiCalCulator);
bmiRouter.get('/', auth, getBmiHistory);

//export the router
export default bmiRouter;
