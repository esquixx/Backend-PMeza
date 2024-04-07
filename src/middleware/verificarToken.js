// verificarToken.js
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const verificarToken = (req, res, next)  =>{
  const token = req.cookies.cookieJWT
  if (token) {
    jwt.verify(token, config.SECRET, (err, decoded) => {
      if (err) {
        return res.render('index', { error: 'Error decodificando el token' })
      } else {
        const rol = decoded.user && decoded.user.role
        let admin =false

                  if(rol === 'admin'){
                     admin = true
                  }
                  else{
                    admin = false
                  }
                  req.userData = { ...decoded.user, admin }
        next()
      }
    })
  } else {
    res.render('index', {})
  }
}

