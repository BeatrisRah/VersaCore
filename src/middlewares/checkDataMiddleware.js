import { checkData } from "../utils/dataUtils.js";

export const checkEmptyData = (req, res, next) => {
    const data = req.body;

    const isEmpty = checkData(data)
    if(isEmpty){
        return res.status(400).json({error:"Data is required and cannot be empty!"})
    }

    next();
};