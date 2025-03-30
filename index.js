import express from 'express'
import 'dotenv/config'
import router from './src/routes.js'

const app = express()

app.use(router)

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log(`Versacore is listening on port http://localhost:${port}...`);
    
})
