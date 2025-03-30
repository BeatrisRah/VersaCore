import express from 'express'
import 'dotenv/config'

const app = express()

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log(`Versacore is listening on port http://localhost:${port}...`);
    
})
