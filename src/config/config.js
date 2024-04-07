import dotenv from 'dotenv'

dotenv.config()

export default {
    PERSISTENCE: process.env.PERSISTENCE,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_DB_NAME: process.env.MONGO_DB_NAME,
    SECRET: process.env.SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
    PORT: process.env.PORT,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    ENTORNO: process.env.ENTORNO,
    mailUser: process.env.MAIL_USER,
    mailPass: process.env.MAIL_PASS,
    secretpayment:  process.env.SECRETPAYMENT,
    publicpayment: process.env.PUBLICPAYMENT
}