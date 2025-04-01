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

    try{
        const chatroom = await chatroomService.create(chatromData, user.id)
        res.json(chatroom)
    } catch(err){
        res.status(400).json({error:err.message})

    }
})

chatController.get('/:chatroomId' , async (req, res) => {
    const chatroomId = req.params.chatroomId;
    try{
        const chatroom = await chatroomService.getOne(chatroomId)
        res.json(chatroom)
    } catch(err){
        res.status(404).json({error:'No content found'})
    }
})

export default chatController;