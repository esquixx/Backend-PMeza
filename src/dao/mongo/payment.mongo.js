import paymentModel from '../mongo/models/payment.model.js'

export default class Ticket {
    createPayment = async ticket => {
        return paymentModel.create(ticket)
    }
    getPayment = async () => {
        return paymentModel.find()
    }
    getPaymentOne = async ({ search }) => {
        return paymentModel.findOne({ search })
    }
    getPaymentByID = async id => {
        return paymentModel.findById(id)
    }
}