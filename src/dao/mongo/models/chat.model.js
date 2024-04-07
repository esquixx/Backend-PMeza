import mongoose from 'mongoose'
const chatCollection = 'chats'
const chatSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'session',
        required: true
    },
    user: {
        type: String,   
    },
    messages: [
        {
            text: {
                type: String,   
            },
        },
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
});
const chatMongo = mongoose.model(chatCollection,chatSchema)

export default chatMongo