import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
export default __dirname  
import config from './config/config.js'

//create hash
export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

//validate hash
export const isValidatePassword = (user, password) => {
    return bcrypt.compareSync(password,user.password)
}

//JWT
export const generateToken = user  => {
    const token =  jwt.sign({user} , config.SECRET, {expiresIn: '24h'})
    return token
}