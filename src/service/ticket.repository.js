export default class ticketRepository {
    constructor(dao,mailModule) {
        this.mailModule = mailModule
        this.dao = dao
    }
    createTicket = async ticket => {
        return this.dao.createTicket(ticket)
    }
    getTicket = async () => {
        return this.dao.getTicket()
    }
    getTicketOne = async ({ search }) => {
        return this.dao.getTicketOne({ search })
    }
    getTicketByIdPopulate = async (user,id, useLean) => {
       
        const compra = await this.dao.getTicketByIdPopulate(id, useLean)
    
        const emailContent = `<div>Estimado/a ${user.firest_name},\n\n su compra se realizo con exito. Total a pagar $ ${compra.amount} </div>`
        await this.mailModule.send(user, 'Gracias por su compra', emailContent)

        return compra
    }
}