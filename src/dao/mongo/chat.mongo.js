import ChatModel from '../mongo/models/chat.model.js'

export default class Product {
    getChats = async () => {
        return ChatModel.find().sort({ timestamp: 1 })
    }
    getChatsById = async id => {
        return ChatModel.findById(id)
    }
    createChats  = async chats => {
        return ChatModel.create(chats)
    }
    updateChats  = async (id,body) => {
        return ChatModel.findByIdAndUpdate(id,body , {
            new : true
        })
    }
    deleteChats  = async id => {
        return ChatModel.findByIdAndDelete(id)
    }
    saveMessage = async (userId, user , message) => {
        try {
           
            let chat = await ChatModel.findOne({ userId })
            
            if (!chat) {
                chat = new ChatModel({userId, user, messages: [] })
            }
     
            chat.messages.push({ text: message })
    
            await chat.save()
    
            return chat
        } catch (error) {
            console.error('Error al guardar el mensaje:', error);
            throw new Error('Error al guardar el mensaje en la base de datos');
        }
    }
}