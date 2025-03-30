import { Router } from "express";

const chatController = Router()

chatController.get('/', (req, res) => {
    res.send('WOkrs')
})

export default chatController;