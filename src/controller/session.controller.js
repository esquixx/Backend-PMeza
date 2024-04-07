import { SessionService } from '../service/index.js'
import { generateToken } from '../util.js'
import bcrypt from 'bcrypt'
import DtoCurrent from '../dto/current.dto.js'
import config from '../config/config.js'
import CustomError from '../errors/custom.errors.js'



export const viewRegister = async (req, res) => {
    res.render('register', {})
}
export const renderLogin = async (req, res) => {
    res.render('session', {})
}
export const login = async (req, res, next) => {
    const { email, password } = req.body

    console.log("EMAIL: " + email)
    console.log("PASSWORD: " + password)
    try {
        let userFound
        if (email === config.USER && password === config.PASSWORD) {
            const passwordHash = await bcrypt.hash(password, 10)
            userFound = {
                email: config.USER,
                password: passwordHash,
                role: 'admin'
            }
        }
        else {
            userFound = await SessionService.getSessionOne({ email }, false)
            userFound.last_login = new Date()
            await userFound.save()
        }

        if (!userFound) {
            CustomError.loginUser(req.body)
        }

        const isMatch = await bcrypt.compare(password, userFound.password)


        if (!isMatch) return res.status(400).json({ message: 'invalid credencial' })



        const token = generateToken(userFound)

        res.cookie('cookieJWT', token).redirect('/api/products/getProduct')


    } catch (error) {
        next(error)
    }
}
export const register = async (req, res, next) => {

    const { firest_name, last_name, age, email, password } = req.body
    try {
        if (!firest_name || !last_name || !age || !email || !password) {
            CustomError.createUsers(req.body)
        }
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await SessionService.register({ firest_name, last_name, age, email }, passwordHash)

        const token = generateToken(newUser)
        res.cookie('cookieJWT', token).redirect('/api/products/getProduct')

    } catch (error) {
        next(error)
    }
}

export const logout = async (req, res) => {
    res.clearCookie('cookieJWT');
    res.redirect('/');
}


export const current = async (req, res) => {
    try {
        const { user } = req.user
        const email = user.email
        let perfil
        if (user.role === 'admin') {
            perfil = {
                email: config.USER,
                role: 'admin'
            }
        }
        else {
            perfil = await SessionService.getSessionOne({ email }, true)
        }
        const perfilUser = new DtoCurrent(perfil)
        res.render('perfil', { user: perfilUser })
    } catch (error) {
        console.log(error)
    }

}

export const githublogin = async (req, res) => {

}

export const githubcallback = async (req, res) => {
    if (!req.user) {
        CustomError.loginGithub()
    }
    res.cookie('cookieJWT', req.user.token).redirect('/api/products/getProduct')
}

export const reminder = async (req, res) => {
    const { email } = req.params

    console.log("EMAIL DEL USUARIO EN CONTROLLER PARA REMINDER: " + JSON.stringify({ email }))
    const result = await SessionService.reminder({ email })
    return res.json({ status: 'success', payload: result })
}

export const recovery = async (req, res) => {
    res.render('recoveryMail', {})
}

export const recoveryPass = async (req, res) => {
    console.log("ENTRA EL RECOVERY")
    const currentTime = new Date()
    const expirationTime = req.query.expirationTime
    // Convertir la hora de expiración del enlace a un objeto de tipo Date
    const expirationDate = new Date(expirationTime);
    let expiro = false
    // Verificar si la hora actual es menor que la hora de expiración del enlace
    if (currentTime < expirationDate) {
        res.render('recoveryPass', { payload: expiro })
    } else {
        expiro = true
        res.render('session', { payload: expiro })
    }

}

export const updatePass = async (req, res) => {
    //traer del query el _id y el newPass
    try {
        const _id = req.params._id
        const newPassword = req.params.newPassword

        const user = await SessionService.getSessionById(_id)

        const isMatch = await bcrypt.compare(newPassword, user.password)
        if (isMatch) {
            return res.json({ status: 'success', payload: false })
        }
        else {
            const passwordHash = await bcrypt.hash(newPassword, 10)
            const update = await SessionService.updateSession(_id, passwordHash)
            return res.json({ status: 'success', payload: update })
        }

    } catch (error) {
        console.log("Error: " + error)
    }

}
