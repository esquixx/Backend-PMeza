import { CartService, SessionService, ProductService } from '../service/index.js'
import mongoose from 'mongoose'
import { opts } from '../config/commander.js'
import CustomError from '../errors/custom.errors.js'

export const createCart = async (req, res, next) => {
    try {
        const { user } = req.user
        let respuesta

        const ClientOpenCart = await SessionService.getSessionById(user._id)

        if (!ClientOpenCart.cart) {
            respuesta = await CartService.createCart()
            const session = await SessionService.updateClientCart(user._id, respuesta)
            return res.status(201).json({ cartId: respuesta });
        }
        else {
            respuesta = ClientOpenCart.cart
            return res.status(201).json({ cartId: respuesta });
        }




    } catch (error) {
        next(error)
    }
}
export const getCart = async (req, res, next) => {

    const { user } = req.user

    const match = await SessionService.getSessionById(user._id)
    const cid = match.cart
    try {
        if (!mongoose.Types.ObjectId.isValid(cid)) {
            CustomError.CartNotFound()
        }
        if (opts.persistence === 'MONGO') {
            const lean = true
            const showCart = await CartService.getCartById(cid, lean)
            res.render('cart', { cart: showCart })
        }
        else {
            const lean = true
            const showCart = await CartService.getCartById(cid, lean)
            const productos = await ProductService.getProducts()

            const productsPopulate = [];

            showCart.products.forEach(item => {

                const product = productos.find(producto => producto._id === item.pid)
                if (product) {
                    productsPopulate.push({
                        title: product.title,
                        price: product.price,
                        quantity: item.quantity
                    });
                }
            });
            showCart.productsPopulate = productsPopulate;
            res.render('cartFile', { cart: showCart })
        }

    } catch (error) {
        next(error)
    }
}

export const addItemCart = async (req, res, next) => {
    try {
        const cid = req.params.cid
        const pid = req.params.pid
        let saveCart
        //veo que cid sea un objectID valido es decir que tenga 24 caracteres.    
        if (opts.persistence === 'MONGO' && !mongoose.Types.ObjectId.isValid(cid)) {
            CustomError.CartNotFound()
        }
        const cartId = await CartService.addItem(cid)
        if (!cartId) {
            CustomError.CartNotFound()
        }
        const cartPid = cartId.products.find(product => product.pid == pid)
        if (cartPid) {
            cartPid.quantity = (cartPid.quantity || 0) + 1
            if (opts.persistence === 'MONGO') {
                saveCart = await cartId.save()
            }
            else {
                saveCart = await CartService.save(cartId._id, cartPid.pid)
            }
            return res.json(saveCart)
        }
        else {
            cartId.products.push({
                pid: pid,
                quantity: 1
            })

            if (opts.persistence === 'MONGO') {
                saveCart = await cartId.save()
            }
            else {
                saveCart = await CartService.save(cartId._id, pid)
            }

            return res.json(saveCart)
        }
    } catch (error) {
        next(error)
    }
}
export const deleteProductCart = async (req, res, next) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    try {
        const result = await CartService.deleteProductCart(cid, pid)
        if (result.modifiedCount === 0) {
            CustomError.DeleteError()
        }
        return res.status(200).json({ message: 'Carrito eliminado correctamente' });
    } catch (error) {
        next(error)
    }
}
export const deleteCarts = async (req, res, next) => {
    const cid = req.params.cid
    try {
        //cuando borro todo el carrito tambien tengo que borrar carts del cliente
        const result = await CartService.deleteCart(cid)
        if (!result) {
            CustomError.DeleteError()
        }
        return res.status(200).json({ message: 'Carrito eliminado correctamente' })
    } catch (error) {
        next(error)
    }
}
export const updateQuantity = async (req, res, next) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const newQuantity = req.body.quantity
    try {
        const result = await CartService.updateQuantity(cid, pid, newQuantity)
        if (result.modifiedCount > 0) {
            return res.status(200).json({ message: 'Cantidad actualizada correctamente' })
        }
        else {
            CustomError.UpdatingError()
        }
    } catch (error) {
        next(error)
    }
}