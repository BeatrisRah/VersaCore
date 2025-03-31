import Chatroom from "../models/Chatroom.js";


export default{
    async getAll(){
        return await Chatroom.find()
    },

    async create(chatroomData, ownerID){
        console.log(chatroomData);
        
        // await Chatroom.create({
        //     ...chatroomData,
        //     owner: ownerID
        // })
    }
}