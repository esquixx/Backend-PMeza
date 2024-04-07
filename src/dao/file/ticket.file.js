import FileManager  from "./file.manager.js"

export default class Ticket extends FileManager {
    constructor(filename = './db.ticket.json'){
        super(filename)
    }

    getTicket = async() => { return this.get()}
    getTicketByID = async id => { return this.getById(id)}
    createTicket = async ticket => {  return this.add(ticket)}
}