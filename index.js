import express from 'express'
import 'dotenv/config'
import router from './src/routes.js'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from "cors";
import http from 'http'
import { Server } from 'socket.io'
import chatNamespace from './src/sockets/chatNamespace.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin:"http://localhost:5173",
        methods:["POST", "GET"]
    }
})

try{
    await mongoose.connect(process.env.MONGODB_CLUSTER_URI)
    console.log('Succssesfuly connected!');
    
} catch(err){
    console.log('Cannot connect to DB :(!');
    
    console.log(err.message);
    
}
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:5173"];

    
app.use(express.json())
app.use(cors({ origin: allowedOrigins }));
app.use(router)

chatNamespace(io)

const port = process.env.PORT || 3030

server.listen(port, () => {
    console.log(`Versacore is listening on port http://localhost:${port}...`);
    
})
