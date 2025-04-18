import chatService from "../services/chatService";

export default function(io){
    const chatNameSpace = io.of('/chatrooms');

    chatNameSpace.on('connection', (socket) =>{
        console.log('User connected');

        socket.on('send_message', async (chatData) => {
            const chat = await chatService.createMessage(chatData)
            chatNameSpace.to(chatData.chatroom).emit('recive_message', chat)
        })


        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    })
}