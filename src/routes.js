import { Router } from "express";
import chatController from "./controllers/chatController.js";
import authRouter from "./controllers/authController.js";

const router = Router()


router.use('/api/users', authRouter)
router.use('/api/chatrooms', chatController)

export default router