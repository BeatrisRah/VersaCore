import User from "../models/User.js"

export default{
    async getAll(){
        return await User.find() 
    }
}