import passport from 'passport'
import passporJWT from 'passport-jwt'
import githubStrategy from 'passport-github2'
import userModel from '../dao/mongo/models/session.model.js'
import { generateToken } from '../util.js'
import config from './config.js'

const JWTStrategy = passporJWT.Strategy

const initializePassport = () => {

    passport.use('github' , new githubStrategy({
            clientID: config.CLIENT_ID,
            clientSecret: config.CLIENT_SECRET,
            callbackUrl: config.CALLBACK_URL
        }  , async (accesToken , refreshToken , profile , done) => {
                console.log(profile)
                try {
                    const email = profile._json.email
                    let user = await userModel.findOne({email})
                    if(!user){
                        console.log('User doesnt\'t exist. pass to register')

                        const newUser = {
                            name: profile._json.name,
                            email,
                            password: '',
                            role: 'user'
                        }
                        const result = await userModel.create(newUser)
                        console.log('User registered succefully!')

                        user={}
                    }
                     
                        const token = generateToken(user)
                        user.token = token
                        return done(null, user)
                } catch (error) {
                    console.error(error)
                    return done('[GITHUB] ' + error)
                }
        }))

        passport.use('jwt'  , new JWTStrategy({
            jwtFromRequest: passporJWT.ExtractJwt.fromExtractors([req => req?.cookies?.cookieJWT ?? null]),
            secretOrKey: 'secretForJWT'
        } , (jwt_payload, done) => {
            done(null, jwt_payload)
        }))

        passport.serializeUser((user,done)=>{
            done(null,user._id)
        })

        passport.deserializeUser(async(id,done)=>{
            const user = await userModel.findById(id)
            done(null,user)
        })
}

export default initializePassport