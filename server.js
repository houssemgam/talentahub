import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import { errorHandler, notFoundError } from './Middlewares/error-handler.js'
import eventRoutes from './routes/eventRoutes.js'


const app = express()
const port = 9090
const dbName = "talenthubdb"
const db_url = `mongodb://127.0.0.1:27017`

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // to read req body ( x www form urlencoded )
app.use('/img', express.static("public/images")) // static directory for files

app.use('/event', eventRoutes)

app.use(notFoundError)
app.use(errorHandler)

mongoose.set('debug', true) // log queries
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise
mongoose.connect(`${db_url}/${dbName}`)
    .then(() => {
        console.log(`Connected to ${dbName}`);
    }).catch(err => {
        console.log(err)
    })


// list to server 
app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})

