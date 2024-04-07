import { Router } from "express"
import { paymentIntents , paymentView} from '../controller/payment.controller.js'
const router = Router()

router.post('/payment-intents', paymentIntents)
router.get('/paymentView', paymentView)

export default router