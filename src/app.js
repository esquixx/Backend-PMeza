import express from 'express'
import morgan from 'morgan'
import productRoutes from './router/products.Router.js'
import cartRoutes from './router/cart.Router.js'
import sessionRoutes from './router/session.Router.js'
import ticketRouter from './router/ticket.Router.js'
import usersRouter from './router/users.Router.js'
import chats from './router/chat.router.js'
import paymentRouter from './router/payment.router.js'
import handlebars from 'express-handlebars'
import __dirname from './util.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import swaggerJSDoc from 'swagger-jsdoc'
import SwaggerUiExpress from 'swagger-ui-express'
import initializePassport from './config/passport.config.js'
import { verificarToken } from './middleware/verificarToken.js'
import errorHandler from './middleware/error.js'
import { loggerMiddleware } from './logger/loggers.js'
import env from './config/config.js'

//fonaqibqcmyzkass

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(loggerMiddleware)

//documentacion
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'Documentacion de proyecto Backend Code-House',
            description: 'Proyecto de curso Backend'
        },
    },

    apis: [`${__dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/apidocs', SwaggerUiExpress.serve, SwaggerUiExpress.setup(specs))

// Ruta de prueba para los logs
app.get('/LoggerTest', (req, res) => {
    req.logger.debug('Debug log')
    req.logger.info('Info log')
    req.logger.warn('Warning log')
    req.logger.error('Error log')
    //  req.logger.fatal('Fatal log') en el tp dice de incluir fatal. pero no existe fatal en winston

    res.send('Errores generados en el entorno ' + env.ENTORNO)
})

//handlebars
app.engine('handlebars', handlebars.engine())
//seteo las vistas 
app.set('views', __dirname + '/views')
//indicamos que motor de plantilla usar
app.set('view engine', 'handlebars')
app.use('/static', express.static(__dirname + '/public'))

app.use(morgan('dev'))

//session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser())

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.get('/', verificarToken, (req, res) => {
    const user = req.userData
    let isPremium = false
    if (user.role === 'premium') {
        isPremium = true
    }
    else {
        isPremium = false
    }
    res.render('index', { userData: req.userData, admin: req.userData.admin, isPremium });
})
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/session', sessionRoutes)
app.use('/api/ticket', ticketRouter)
app.use('/api/users', usersRouter)
app.use('/api/chats', chats)
app.use('/api/payment', paymentRouter)
app.use(errorHandler)
export default app