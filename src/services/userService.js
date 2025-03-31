import jwt from "jsonwebtoken";
import User from "../models/User.js"

async function createToken({id, username, email}){

    const payload = {
        id,
        username,
        email,
    }

    const token = await new Promise((resolve, reject) => {
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) reject(err);
            else resolve(token);
        });
    });

    return token;
}

export default{
    async getAll(){
        return await User.find() 
    },
    async create(userData){
        //TODO HASH PASSWORD
        try{
            const user = await User.create(userData)
            const token = await createToken(user)
            return {succses: true, user, token}
        } catch(err){
            return {succses: false, error:err.message}

        }

    }
}