import CartDao from "./daos/mongo/cart.dao.js";
import ProductDao from "./daos/mongo/product.dao.js";

import ProductRepository from "./repository/product.repository.js";
import CartRepository from "./repository/cart.repository.js";

const cartDao = new CartDao();
const productDao = new ProductDao();

export const cartsService = new CartRepository(cartDao);
export const productsService = new ProductRepository(productDao);