import Message from "../models/Message.js";

export default{
    async createMessage(data){
        await Message.create({
            chatroom:data.roomId,
            sender:data.user,
            content: data.message
        })
    },
}
