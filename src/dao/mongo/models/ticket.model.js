import mongoose from "mongoose"
const ticketSchema = new mongoose.Schema({
    code: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
        unique: true,
        require: true
    },
    purchase_dateTime: {
        type: Date,
        default: Date.now,
        require: true
    },
    amount : {
        type: Number,
        require: true
    } ,
    purchaser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        require: true
    }
})
export default mongoose.model('ticket', ticketSchema)