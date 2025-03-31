import { Router } from "express";
import chatController from "./controllers/chatController.js";

const router = Router()

router.use('/api/chatrooms', chatController)

export default router