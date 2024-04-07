import ticketModel from '../mongo/models/ticket.model.js'

export default class Ticket {
    createTicket = async ticket => {
        return ticketModel.create(ticket)
    }
    getTicket = async () => {
        return ticketModel.find()
    }
    getTicketOne = async ({ search }) => {
        return ticketModel.findOne({ search })
    }
    getTicketByID = async id => {
        return ticketModel.findById(id)
    }
    getTicketByIdPopulate = async (id, useLean = false) => {
        const queryTicket = ticketModel.findById(id)
        const QueryTicketID = useLean ? await queryTicket.populate({
            path: 'purchaser',
            model: 'Cart',
            populate: {
                path: 'products.pid',
                model: 'Product'
            }
        }).lean().exec() : await queryTicket
      
        return QueryTicketID
    }
}