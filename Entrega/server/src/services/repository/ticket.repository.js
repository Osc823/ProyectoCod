export default class TicketRepository{
    constructor(dao) {
        this.dao = dao;
    }
    createTicket = (ticket) => {
        return this.dao.createTicket(ticket);
    }
    getTicketById = (id) => {
        return this.dao.getTicketById(id);
    }
}