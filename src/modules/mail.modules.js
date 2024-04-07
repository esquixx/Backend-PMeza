import nodemailer from 'nodemailer'
import config from '../config/config.js'

export default class Mail {
    constructor(){
        this.trasport = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.mailUser,
                pass: config.mailPass
            }
        })
    }

    send = async(user, subject , html) => {
        const opt = {
            from: config.mailUser,
            to: user.email,
            subject,
            html
        }
        console.log({opt})
        const result = await this.trasport.sendMail(opt)
        console.log(result)
        return result
    }
}