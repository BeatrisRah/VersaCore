import express from 'express'
import 'dotenv/config'
import router from './src/routes.js'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from "cors";
import http from 'http'
import { Server } from 'socket.io'
import chatNamespace from './src/sockets/chatNamespace.js'
import { logginInfoMiddleware } from './src/middlewares/logginInfoMiddleware.js'


const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:5173"];


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
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

    
app.use(express.json())
app.use(cors({ origin: allowedOrigins }));
app.use(logginInfoMiddleware)
app.use(router)

chatNamespace(io)

const port = process.env.PORT || 3030

server.listen(port, () => {
    console.log(`Versacore is listening on port http://localhost:${port}...`);
    
})
