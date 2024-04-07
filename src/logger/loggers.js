import winston from 'winston'
import env from '../config/config.js'

const developmentLogger = winston.createLogger({
    level: 'debug',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
  })
  
  const productionLogger = winston.createLogger({
    level: 'info',
    format: winston.format.simple(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    ],
  })
  
  const loggerMiddleware = (req, res, next) => {
    req.logger = env.ENTORNO === 'produccion' ? productionLogger : developmentLogger;
    next()
  }
  
  export { developmentLogger, productionLogger, loggerMiddleware }