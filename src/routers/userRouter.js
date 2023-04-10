import { Router } from 'express';
import { getProfile } from '../controllers/userController.js';

//create a router
const userRouter = Router();

//api endpoints with controller functions
userRouter.get('/profile/:userId', getProfile);

//export the router
export default userRouter;
