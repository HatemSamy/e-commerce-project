import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
//set directory dirname 
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, './config/.env') })
import express from 'express'
import { appRouter } from './src/modules/index.router.js'
const app = express()
const port = process.env.PORT || 3000
 appRouter(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))