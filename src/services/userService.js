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

function checkAuthData(userData, rePassword = false){
    if(rePassword){
        if(!userData.rePass || userData.rePass !== userData.password || !userData.username){
            throw new Error('Passwords dont match!')
        }
    }
    if(!userData.email || !userData.password){
        throw new Error('Incorrent data!')
    }

}

export default{
    async getAll(){
        return await User.find() 
    },
    async create(userData){
        try{
            checkAuthData(userData, true)
            const hashPAss = await bcrypt.hash(userData.password, parseInt(process.env.SALT))

            const user = await User.create({
                ...userData,
                password:hashPAss
            })
            const token = await createToken(user)

            return {
                succses: true, 
                username: user.username, 
                email:user.email, 
                id:user.id, 
                token}
        } catch(err){
            return {succses: false, error:err.message}

        }

    },
    async login(userData){
        try{
            checkAuthData(userData)
            const user = await User.findOne({email: userData.email})

            if(!user) throw new Error('Email or password incorrect!')
            
            const isValid = await bcrypt.compare(userData.password, user.password)

            if(!isValid) throw new Error('Email or password incorrect!')
    
            const token = await createToken(user)

            return{ 
                succses:true,
                username: user.username, 
                email:user.email, 
                id:user.id,
                token}

        } catch(err){
            return {succses: false, error:err.message}
        }
    }
}