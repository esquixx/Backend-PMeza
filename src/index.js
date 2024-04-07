import app from './app.js'
import config from "./config/config.js"
import { Server } from 'socket.io'

const httpServer = app.listen(config.PORT, () => console.log("OK!"))
const io = new Server(httpServer)

const messages = []

io.on('connection' , socket => {
    console.log("new socket")

    socket.on('message' , data => {
        messages.push(data)
        io.emit('logs' , messages)
    })
})