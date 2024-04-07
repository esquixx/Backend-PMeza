import {generateUserErrorsInfo , loginUserErrorInfo , InvalidGitHub , ProductNotFound ,ProductInStock ,UpdatingError,DeleteError,CartNotFound ,TicketNotGenerated} from  './info.js'
import EErrors from './enums.js'
export default class CustomError {
    static createError({ name = 'Error', cause, message, code }) {
        const error = new Error(message,  {cause} )
        error.name = name
        error.code = code
        throw error
    }
    static createUsers(user){
        CustomError.createError({
            name: 'INCOMPLETE_REGISTRATION',
            cause: generateUserErrorsInfo(user),
            message: 'ERROR: INCOMPLETE REGISTRATION - PLEASE FILL IN ALL REQUIRED FIELDS',
            code:  EErrors.INCOMPLETE_REGISTRATION
           
        }) 
    }
    static loginUser(user){
        CustomError.createError({
            name: 'USER_NOT_FOUND',
            cause: loginUserErrorInfo(user),
            message: 'ERROR: USER_NOT_FOUND ',
            code:  EErrors.USER_NOT_FOUND    
        }) 
    }

    static loginGithub(){
        CustomError.createError({
            name: 'USER_NOT_FOUND',
            cause: InvalidGitHub(),
            message: 'ERROR: USER_NOT_FOUND ',
            code:  EErrors.USER_NOT_FOUND    
        }) 
    }

    static ProductNotFound(){
        CustomError.createError({
            name: 'PRODUCT_NOT_FOUND',
            cause: ProductNotFound(),
            message: 'ERROR: PRODUCT_NOT_FOUND ',
            code:  EErrors.PRODUCT_NOT_FOUND    
        }) 
    }

    static ProductInStock(){
        CustomError.createError({
            name: 'PRODUCT_NOT_FOUND',
            cause: ProductInStock(),
            message: 'ERROR: PRODUCT_IN_STOCK ',
            code:  EErrors.PRODUCT_IN_STOCK    
        }) 
    }

    static UpdatingError(){
        CustomError.createError({
            name: 'UPDATING_ERROR',
            cause: UpdatingError(),
            message: 'ERROR: UPDATING_ERROR ',
            code:  EErrors.UPDATING_ERROR    
        }) 
    }
 
    static DeleteError(){
        CustomError.createError({
            name: 'DELETE_ERROR',
            cause: DeleteError(),
            message: 'ERROR: DELETE_ERROR ',
            code:  EErrors.DELETE_ERROR    
        }) 
    }

    static CartNotFound(){
        CustomError.createError({
            name: 'CART_NOT_FOUND',
            cause: CartNotFound(),
            message: 'ERROR: CartNotFound ',
            code:  EErrors.CART_NOT_FOUND    
        }) 
    }

    static TicketNotGenerated(){
        CustomError.createError({
            name: 'TICKET_NOT_GENERATED',
            cause: TicketNotGenerated(),
            message: 'ERROR:  TICKET NOT GENERATED ',
            code:  EErrors.TICKET_NOT_GENERATED    
        }) 
    }
    
   
}