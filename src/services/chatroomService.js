import Chatroom from "../models/Chatroom.js";


export default{
    async getAll(){
        return await Chatroom.find()
    },

    async create(chatroomData, ownerID){
        
        return await Chatroom.create({
            ...chatroomData,
            owner: ownerID
        })
    },

    async getOne(chatroomId){
        return await Chatroom.findById(chatroomId)
    },

    async joinChatRoom(chatroomID, userID){
        await Chatroom.findByIdAndUpdate(chatroomID, {$push: {members: userID}})
    },
}