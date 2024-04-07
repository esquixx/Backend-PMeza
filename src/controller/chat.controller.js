import { ChatService } from '../service/index.js'
import mongoose from 'mongoose'

export const viewChat = async (req, res) => {
    try {
        const { user } = req.user
        const usuario = user.firest_name
        res.render('chat', { usuario })
    } catch (error) {
        console.error(error)
    }
}
export const sendMessage = async (req, res) => {
    try {
        const { user } = req.user
        const { message } = req.body
        const chat = await ChatService.save(user._id, user.firest_name, message)
        console.log(chat)
        res.sendStatus(200)
    } catch (error) {
        console.error(error)
    }
}

export const getMessages = async (req, res) => {
    try {
        const { user } = req.user
        const messages = await ChatService.getChatsById(user._id)
        res.json(messages)
    } catch (error) {
        console.error(error)
    }
}