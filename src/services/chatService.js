import Message from "../models/Message.js";

export default{
    async createMessage(data){
        return await Message.create({
            ...data
        })
    },
}
