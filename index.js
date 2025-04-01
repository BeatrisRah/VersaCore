import express from 'express'
import 'dotenv/config'
import router from './src/routes.js'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from "cors";

const app = express()


try{
    await mongoose.connect(process.env.MONGODB_CLUSTER_URI)
    console.log('Succssesfuly connected!');
    
} catch(err){
    console.log('Cannot connect to DB :(!');
    
    console.log(err.message);
    
}
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:3000"];

    
app.use(express.json())
app.use(cors({ origin: allowedOrigins }));
app.use(router)

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log(`Versacore is listening on port http://localhost:${port}...`);
    
})
