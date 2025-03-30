import { Router } from "express";
const chatController = Router()

chatController.get('/', async (req, res) => {
    res.send('works')
})

export default chatController;