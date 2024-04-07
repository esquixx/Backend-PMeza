import { Router } from 'express'
import { login, register, logout, renderLogin, current, githublogin, githubcallback, viewRegister, reminder, recovery, recoveryPass , updatePass} from '../controller/session.controller.js'
import passport from 'passport'

const router = Router()

router.get('/', renderLogin)
router.get('/viewRegister', viewRegister)
router.post('/login', login)
router.get(
    '/githublogin',
    passport.authenticate('github', { scope: ['user:email'] }),
    githublogin
)
router.get(
    '/githubcallback',
    passport.authenticate('github', { failureRedirect: 'error?error=githubFail' }),
    githubcallback
)
router.post('/register', register)
router.get('/logout', logout)
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    current)
router.get('/reminder/:email', reminder)
router.get('/recovery', recovery)
router.get('/recoveryPass', recoveryPass)
router.put('/:_id/change/:newPassword', updatePass)


export default router