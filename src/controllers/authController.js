import { Router } from "express";
import userService from "../services/userService.js";
import { checkEmptyData } from "../middlewares/checkDataMiddleware.js";
import chatroomService from "../services/chatroomService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { authLimiter, generalLimiter } from "../middlewares/rateLimitMiddleware.js";

const authRouter = Router()



authRouter.post('/register', authLimiter, checkEmptyData, async (req, res) => {
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

authRouter.post('/login', authLimiter, checkEmptyData,  async (req, res) => {
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

authRouter.get('/:userId/chatrooms', generalLimiter, isAuth, async (req, res) => {
    const userId = req.params.userId;
    // !! TODO: Only set user can req for their chatrooms
    try{
        if(req.user.id !== userId) throw new Error('Unauthorized request!')
        const rooms = await chatroomService.getUserRooms(userId)
        res.json(rooms)
        
    } catch(err){
        res.status(401).json({error: err.message})
        console.log(err.message);
        
    }
})

export default authRouter;