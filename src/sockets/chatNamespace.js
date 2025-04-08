export default function(io){
    const chatNameSpace = io.of('/chatrooms');

    chatNameSpace.on('connection', (socket) =>{
        console.log('User connected');


        socket.on('disconnect', () => {
            console.log('user disconnected');
        })
    })
}