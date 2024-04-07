import { Router } from 'express'
import { createCart, addItemCart, getCart, deleteProductCart, deleteCarts, updateQuantity } from '../controller/cart.controller.js'
import { purchase } from '../controller/ticket.controller.js'
import passport from 'passport'

const router = Router()

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    createCart)
router.get(
    '/:cid',
    passport.authenticate('jwt', { session: false }),
    getCart)
router.post('/:cid/product/:pid', addItemCart)
router.delete('/:cid/product/:pid', deleteProductCart)
router.delete('/:cid', deleteCarts)
router.put('/:cid/product/:pid', updateQuantity)
router.post('/:cid/purchase', purchase)

export default router