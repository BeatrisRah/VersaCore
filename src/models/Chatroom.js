import { model, Schema } from "mongoose";


const chatroomSchema = new Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    visibility:{
        type:String
    },
    imageURL:{
        type:String
    },
    owner: {
        type: Types.ObjectId,
        ref:'User'
    }, 
    members:[{
        type: Types.ObjectId,
        ref: 'User'
    }],
    messages:[{
        type: Types.ObjectId,
        ref:'Message'
    }],
    createdAt: { type: Date, default: Date.now }
})


const Chatroom = model('Chatroom', chatroomSchema)

export default Chatroom;

