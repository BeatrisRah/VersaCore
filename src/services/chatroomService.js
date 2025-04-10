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

    async getUserRooms(userId){
        return await Chatroom.find({
        $or: [
            { owner: userId },
            { members: userId }
        ]
        });
    }
}