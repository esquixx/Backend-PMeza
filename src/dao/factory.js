import config from "../config/config.js"
import { opts } from '../config/commander.js'
import mongoose from "mongoose"

export let producto
export let session
export let cart
export let ticket
export let payment 
export let chat

switch (opts.persistence) {
    case "MONGO":
        console.log("Persistencia con MONGO")
        const mongoURL = config.MONGO_URL
        const mongoDBName = config.MONGO_DB_NAME
        await mongoose.connect(mongoURL, { dbName: mongoDBName })
        const { default: ProductsMongo } = await import('./mongo/products.mongo.js')
        const { default: CartMongo } = await import('./mongo/carts.mongo.js')
        const { default: SessionMongo } = await import('./mongo/session.mongo.js')
        const { default: TicketMongo } = await import('./mongo/ticket.mongo.js')
        const { default: paymentMongo } = await import('./mongo/payment.mongo.js')
        const { default: chatMongo } = await import('./mongo/chat.mongo.js')

        producto = ProductsMongo
        session = SessionMongo
        cart = CartMongo
        ticket = TicketMongo
        payment = paymentMongo
        chat = chatMongo

        break

    case "FILE":
        console.log("Persistencia con FILE")
        const { default: ProductsFile } = await import('./file/product.file.js')
        const { default: SessionFile } = await import('./file/session.file.js')
        const { default: CartsFile } = await import('./file/cart.file.js')
        const { default: TicketFile } = await import('./file/ticket.file.js')

        producto = ProductsFile
        session = SessionFile
        cart = CartsFile
        ticket = TicketFile
        break

    default:
        throw new Error('Persistence not recognized')

}