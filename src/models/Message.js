import {Schema, model, Types} from "mongoose";


const chatSchema = new Schema({
    chatroom: {
        type: Types.ObjectId, 
        ref: 'Chatroom' 
    }, 
    sender:{
        type: Types.ObjectId,
        ref:'User',
    },
    content:{
        type:String,
        required: true
    },
    timestamp: { type: Date, default: Date.now }
})

const Message = model('Message',chatSchema, 'messages')
export default Message;