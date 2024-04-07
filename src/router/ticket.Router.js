import { Router } from 'express'
import {  getTicketByIdPopulate } from '../controller/ticket.controller.js'
import passport from 'passport'

const router = Router()


router.get(
    '/:tid',
    passport.authenticate('jwt', { session: false }),
    getTicketByIdPopulate)

export default router