import mongoose from "mongoose"
const paymentSchema = new mongoose.Schema({
    //creo q no lo voy a necesitar. por que lo trabajo desde la libreria
})
export default mongoose.model('payment', paymentSchema)