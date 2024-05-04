import CartDao from "./daos/mongo/cart.dao.js";
import ProductDao from "./daos/mongo/product.dao.js";
import TicketDao from "./daos/mongo/ticket.dao.js";

import ProductRepository from "./repository/product.repository.js";
import CartRepository from "./repository/cart.repository.js";
import TicketRepository from "./repository/ticket.repository.js";

const cartDao = new CartDao();
const productDao = new ProductDao();
const ticketDao = new TicketDao();

export const cartsService = new CartRepository(cartDao);
export const productsService = new ProductRepository(productDao);
export const ticketService = new TicketRepository(ticketDao);