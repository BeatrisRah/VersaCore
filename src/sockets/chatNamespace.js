import chatroomService from "../services/chatroomService.js";
import chatService from "../services/chatService.js";

export default function(io){
    const chatNameSpace = io.of('/chatrooms');

    chatNameSpace.on('connection', (socket) =>{
        console.log('User connected');

        socket.on("join_room", (roomId) => {
            socket.join(roomId);
        });

        socket.on('send_message', async (chatData) => {

            try{
                const chat = await chatService.createMessage({
                    chatroom: chatData.chatroom,
                    sender: chatData.sender,
                    content: chatData.content
                })

                await chatroomService.saveMessage(chatData.chatroom, chat)
                chatNameSpace.to(chatData.chatroom).emit('recive_message', chat)
            } catch(err){
                console.log(err.message);
                
            }
        })


        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    })
}