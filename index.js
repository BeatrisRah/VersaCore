import express from 'express'
import 'dotenv/config'
import router from './src/routes.js'
import mongoose from 'mongoose'
import 'dotenv/config'

const app = express()

try{
    await mongoose.connect(process.env.MONGODB_CLUSTER_URI)
    console.log('Succssesfuly connected!');
    
} catch(err){
    console.log('Cannot connect to DB :(!');
    
    console.log(err.message);
    
}

app.use(express.json())
app.use(router)

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log(`Versacore is listening on port http://localhost:${port}...`);
    
})
