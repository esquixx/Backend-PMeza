import CustomError from '../errors/custom.errors.js'
export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }
    getCart = async () => {
        return this.dao.getCart()
    }
    getCartById = async (id, useLean) => {
        return this.dao.getCartById(id, useLean)
    }
    getCartOne = async ({ params }) => {
        return this.dao.getCartOne(params)
    }
    createCart = async () => {
        try {
            const newCart = ({
                products: [],
                closeBuy: false
            })

            const resp = await this.dao.createCart(newCart)

            return resp._id
        } catch (error) {
            throw error
        }
    }
    updateCart = async (id, body) => {
        return this.dao.updateCart(id, body)
    }
    deleteCart = async (id) => {
        return this.dao.deleteCart(id)
    }
    deleteProductCart = async (cid, pid) => {
        return this.dao.deleteProductCart(cid, pid)
    }
    addItem = async (cid) => {
        const showCart = await this.dao.getCartById(cid)
        return showCart
    }
    updateQuantity = async (cid, pid, newQuantity) => {
        return this.dao.updateQuantity(cid, pid, newQuantity)
    }
    save = async (idcart, pid) => {
        const cartUpdate = this.dao.saveCart(idcart, pid)
        return cartUpdate
    }
    getCartByPid = async (id, data) => {
        return this.dao.getCartByPid(id, data)
    }
}