import mongoose from 'mongoose'

const cartSchema =  new mongoose.Schema({
    products: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            require: true

        },
        quantity: {
            type: Number,
            require: true
        }
    }],
    closeBuy : {        
        type: Boolean,
        required: true,
        default: false
    }
})
export default mongoose.model('Cart', cartSchema)