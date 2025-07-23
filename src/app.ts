import cors from 'cors'
import bodyParser from 'body-parser'
import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/auth/authRoutes'

const prefix = '/api/v1'

dotenv.config()
const app = express()

app.use(cors())
app.use(bodyParser.json({limit: '1gb'}))
app.use(bodyParser.urlencoded({extended: false, limit: '1gb'}))

app.use(prefix, authRoutes)

app.get('/', () => {
    console.log('Service is working');
})

export {
    app
}