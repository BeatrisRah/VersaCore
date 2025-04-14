import Chatroom from "../models/Chatroom.js";
import { checkData } from "../utils/dataUtils.js";


export default{
    async getAll(){
        return await Chatroom.find()
    },

    async create(chatroomData, ownerID){
        const isInvalid = checkData(chatroomData)

        if(isInvalid) throw new Error('Please fill all inputs!')
        
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
        const res =  await Chatroom.find({
        $or: [
            { owner: userId },
            { members: userId }
        ]
        });
        const joinedRooms =  res.filter(room => room.owner.toString() !== userId)
        const ownedRooms = res.filter(room => room.owner.toString() === userId)
        

        return {
            joinedRooms, ownedRooms
        }
    }
}