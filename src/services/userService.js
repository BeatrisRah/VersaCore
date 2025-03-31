import jwt from "jsonwebtoken";
import User from "../models/User.js"

async function createToken({id, username, email}){

    const payload = {
        id,
        username,
        email,
    }
    let token = null;

    await jwt.sign(payload, process.env.SECRET,{ expiresIn: '1h' }, function(err, generatedToken){
        token = generatedToken;
        
    } )

    return token;
}

export default{
    async getAll(){
        return await User.find() 
    }
}