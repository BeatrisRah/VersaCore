import { Router } from "express";
import chatroomService from "../services/chatroomService.js";
import { checkEmptyData } from "../middlewares/checkDataMiddleware.js";
import { isAuth } from "../middlewares/authMiddleware.js";
const chatController = Router()

chatController.get('/', async (req, res) => {
    const allChats = await chatroomService.getAll()
    res.send(allChats)
})

chatController.post('/', isAuth,  checkEmptyData,  async (req, res) => {
    const chatromData = req.body;
    const user = req.user

    await chatroomService.create(chatromData, user.id)
    res.end()
})

export default chatController;