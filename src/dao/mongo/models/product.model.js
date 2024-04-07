import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    thumbnail: {
        type: String
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    status:{
        type: Boolean,
        require: true,
        default: true
    },
    owner:{
        type: String,
        default: "admin"
    }
}, {
    timestamps: true
})
productSchema.plugin(mongoosePaginate)

export default mongoose.model('Product', productSchema)