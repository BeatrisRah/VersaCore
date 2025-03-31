import jwt from "jsonwebtoken";
import User from "../models/User.js"
import bcrypt from 'bcrypt'

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
        //** Happy paht (userData is as expexted) */
        try{
            const hashPAss = await bcrypt.hash(userData.password, parseInt(process.env.SALT))

            const user = await User.create({
                ...userData,
                password:hashPAss
            })
            const token = await createToken(user)
            
            return {succses: true, user, token}
        } catch(err){
            return {succses: false, error:err.message}

        }

    }
}