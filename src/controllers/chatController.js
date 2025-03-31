import { Router } from "express";
import chatroomService from "../services/chatroomService.js";
import { checkEmptyData } from "../middlewares/checkDataMiddleware.js";
const chatController = Router()

chatController.get('/', async (req, res) => {
    const allChats = await chatroomService.getAll()
    res.send(allChats)
})

chatController.post('/', checkEmptyData,  async (req, res) => {
    const chatromData = req.body;

    // await chatroomService.create(chatromData, 'user')
    res.end()
})

export default chatController;