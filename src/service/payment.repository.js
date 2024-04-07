import Stripe from "stripe"
import config from "../config/config.js"

export default class PaymentService {
    constructor() {
        this.Stripe = new Stripe(config.secretpayment)
    }

    createPaymentIntent = async (data) => {
        const paymentIntent = this.Stripe.paymentIntents.create(data)
        return paymentIntent
    }
}