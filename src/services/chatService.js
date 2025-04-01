import Message from "../models/Message.js";

export default{
    async getAllMessages(chatroomID){
        return await Message.find({ chatroomID }).sort({ createdAt: 1 });
    },
    async createMessage(data){
        await Message.create({
            chatroom:data.roomId,
            sender:data.user,
            content: data.message
        })
    }
}
