import EErrors from "../errors/enums.js"

export default (error, req, res, next) => {
    console.error("ENTRO AL MIDDLEWARE " + error.code)
    switch (error.code) {
        case EErrors.DATA_BASE_ERRORS:
            return res.status(500).send({
                status: 'ERROR DATABASE',
                code: error.code,
                error: error.name,
                cause: error.cause
            })
            break
        case EErrors.INCOMPLETE_REGISTRATION:
            return res.status(400).send({
                status: 'ERROR 400',
                code: error.code,
                error: error.name,
                cause: error.cause
            })
            break
        case EErrors.USER_NOT_FOUND:
            return res.status(400).send({
                status: 'ERROR 400',
                code: error.code,
                error: error.name,
                cause: error.cause
            })
            break
        case EErrors.PRODUCT_NOT_FOUND:
            return res.status(400).send({
                status: 'ERROR 400',
                code: error.code,
                error: error.name,
                cause: error.cause
            })
            break
        case EErrors.PRODUCT_IN_STOCK:
            return res.status(409).send({
                status: 'ERROR 409',
                code: error.code,
                error: error.name,
                cause: error.cause
            })
            break
        case EErrors.UPDATING_ERROR:
            return res.status(404).send({
                status: 'ERROR 404',
                code: error.code,
                error: error.name,
                cause: error.cause
            })
            break
        case EErrors.DELETE_ERROR:
            return res.status(404).send({
                status: 'ERROR 404',
                code: error.code,
                error: error.name,
                cause: error.cause
            })
            break
        case EErrors.CART_NOT_FOUND:
            return res.status(404).send({
                status: 'ERROR 404',
                code: error.code,
                error: error.name,
                cause: error.cause
            })
            break
        case EErrors.TICKET_NOT_GENERATED:
            return res.status(404).send({
                status: 'ERROR 404',
                code: error.code,
                error: error.name,
                cause: error.cause
            })
            break
        default:
            res.status(500).send({
                status: 'ERROR',
                error: 'Undandled error'
            })
            break
    }
}