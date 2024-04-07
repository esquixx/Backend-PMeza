import { Router } from 'express'
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct, viewAddProduct } from '../controller/product.controller.js'
import passport from 'passport'
import { verificarToken } from '../middleware/verificarToken.js'

const router = Router()

router.get(
    '/getProduct',
    passport.authenticate('jwt', { session: false }),
    verificarToken,
    getProducts
)
router.get('/getProductById/:id', getProductById)
router.get(
    '/ViewAddProduct',
    passport.authenticate('jwt', { session: false }),
    viewAddProduct)
router.post('/addProduct',
    passport.authenticate('jwt', { session: false }),
    addProduct)
router.put('/updateProduct/:id', updateProduct)
router.delete('/deleteProduct/:id', deleteProduct)


export default router