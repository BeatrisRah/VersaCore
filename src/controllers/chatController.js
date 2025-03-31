import { Router } from "express";
import chatroomService from "../services/chatroomService.js";
import { checkData } from "../utils/dataUtils.js";
const chatController = Router()

chatController.get('/', async (req, res) => {
    const allChats = await chatroomService.getAll()
    res.send(allChats)
})

chatController.post('/', async (req, res) => {
    const chatromData = req.body;
    
    const emptyData = checkData(chatromData)
    if(emptyData) {
        return res.status(400).json({error:"Data is required and cannot be empty!"})
    }
    res.end()
})

export default chatController;