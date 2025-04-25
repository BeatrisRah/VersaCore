import { Router } from "express";
import chatController from "./controllers/chatController.js";
import authRouter from "./controllers/authController.js";
import { generalLimiter } from "./middlewares/rateLimitMiddleware.js";

const router = Router()


router.use('/api/users', authRouter)
router.use('/api/chatrooms', generalLimiter, chatController)

export default router