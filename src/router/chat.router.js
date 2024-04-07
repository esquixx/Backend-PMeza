import { Router } from 'express'
import { viewChat, sendMessage , getMessages} from '../controller/chat.controller.js'
import passport from 'passport'

const router = Router()

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    viewChat)
router.post(
    '/message',
    passport.authenticate('jwt', { session: false }),
    sendMessage)
router.get('/messages',
    passport.authenticate('jwt', { session: false }),
    getMessages)




export default router