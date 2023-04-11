import { Router } from 'express';
import { getProfile } from '../controllers/userController.js';
import auth from '../middleware/authMiddleware.js';

//create a router
const userRouter = Router();

//api endpoints with controller functions
userRouter.get('/profile/:userId', auth, getProfile);

//export the router
export default userRouter;
