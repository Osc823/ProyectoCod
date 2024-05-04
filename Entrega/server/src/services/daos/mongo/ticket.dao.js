import { ticketModel } from "../../models/ticket.model.js";

class TicketDao {
  async createTicket(ticketData) {
    return await ticketModel.create(ticketData);
  }

  async getTicketById(id) {
    return await ticketModel.findById(id);
  }

}

export default TicketDao;
