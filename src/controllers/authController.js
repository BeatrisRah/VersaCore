import { Router } from "express";
import userService from "../services/userService.js";
import { checkEmptyData } from "../middlewares/checkDataMiddleware.js";

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

authRouter.post('/login', (req, res) => {
    
})

export default authRouter;