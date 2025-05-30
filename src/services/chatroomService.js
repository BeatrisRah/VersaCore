import Chatroom from "../models/Chatroom.js";
import Message from "../models/Message.js";
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
        const chatroom = await Chatroom.findById(chatroomId).populate('members', 'username _id');
        const messeges = await Message.find({chatroom: chatroomId})
        .populate('sender', 'username _id')
        .sort({timestamp: 1})
        .lean()


        return [chatroom, messeges]
    },

    async joinChatRoom(chatroomID, userID){
        const chatroom = await Chatroom.findById(chatroomID);

        const isOwner = chatroom.owner.toString() === userID;
        const isAlreadyMember = chatroom.members.some(
            member => member.toString() === userID
        );
    
        if (isOwner || isAlreadyMember) {
            throw new Error('Already in chat!') 
        }
    

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
    },

    async saveMessage(chatroomId, message){
        await Chatroom.findByIdAndUpdate(chatroomId, { $push: {messages: message}})
    }

}