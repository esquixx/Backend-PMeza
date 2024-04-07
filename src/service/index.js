import { producto, cart, session  , ticket ,  payment , chat} from "../dao/factory.js"
import Mail from "../modules/mail.modules.js"
import ProductRepository from "./product.repository.js"
import CartRepository from "./cart.repository.js"
import SessionRepository from "./session.repository.js"
import ticketRepository  from "./ticket.repository.js"
import PaymentRepository from  "./payment.repository.js"
import ChatRepository from "./chat.repository.js"

const mailModule = new  Mail()
const ticketDao = new ticket()
const paymentDao = new  payment()

export const ProductService = new ProductRepository( new producto())
export const SessionService = new SessionRepository( new session() , ticketDao, mailModule )
export const CartService = new CartRepository( new cart())
export const ticketService = new ticketRepository( ticketDao,mailModule)
export const paymentService = new PaymentRepository(paymentDao)
export const ChatService = new ChatRepository( new chat())
