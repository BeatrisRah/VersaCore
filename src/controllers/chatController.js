import { Router } from "express";
import chatroomService from "../services/chatroomService.js";
const chatController = Router()

chatController.get('/', async (req, res) => {
    const allChats = await chatroomService.getAll()
    res.send(allChats)
})

chatController.post('/', async (req, res) => {
    const chatromData = req.body;
    console.log(chatromData);
    res.end()
    
})

export default chatController;