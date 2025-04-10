import { Router } from "express";
import userService from "../services/userService.js";
import { checkEmptyData } from "../middlewares/checkDataMiddleware.js";
import chatroomService from "../services/chatroomService.js";

const authRouter = Router()



authRouter.post('/register', checkEmptyData, async (req, res) => {
    const userDetails = req.body;

    const {
        token,
        username, 
        email, 
        id, 
        succses, error} = await userService.create(userDetails)

    if(!succses){
        return res.status(400).json({error})
    }

    res.status(201).json({username,email, id, token})
})

authRouter.post('/login', checkEmptyData,  async (req, res) => {
    const userDetails = req.body;

    const {
        token,
        username, 
        email, 
        id, 
        succses, error} = await userService.login(userDetails);
    
    if(!succses){
        return res.status(400).json({error})
    }

    res.status(200).json({username,email, id, token})
})

authRouter.get('/:userId', (req, res) => {
// implenent
})

authRouter.get('/:userId/chatrooms', async (req, res) => {
    const userId = req.params.userId;

    try{
        const rooms = await chatroomService.getUserRooms(userId)
        // TODO: Send An object as {
        // joinedRooms:[], ownedRooms:[] }
        res.json(rooms)
        
    } catch(err){
        console.log(err.message);
        
    }
})

export default authRouter;