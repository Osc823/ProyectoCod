import config from "../config/config.js";
import MongoSingleton from "../config/mongodb-singleton.js"

let cartsService;
let productsService;  

async function initializeMongoService() {
    req.logger.info("Iniciando Servicio para Mongo!!");
    try {
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); // Salir con código de error
    }
}

switch (config.persistence) {
    case 'mongodb':
        initializeMongoService();
        const { default: CartServiceMongo } = await import('./daos/mongo/cart.dao.js')
        cartsService = new CartServiceMongo
        req.logger.info("Servicio de carrito cargado:");
        req.logger.info(cartsService);

        const { default: ProductsServiceMongo } = await import('./daos/mongo/product.dao.js')
        productsService = new ProductsServiceMongo
        req.logger.info("Servicio de productos cargado:");
        req.logger.info(productsService);
        break;

    case 'file':
        // IMPORTARME le DAO
        const { CartManager } = await import('./daos/filesystem/Cart.js')
        cartsService = new CartManager("./carrito.json")
        req.logger.info("Servicio de carrito cargado:");
        req.logger.info(cartsService);

        const { ProductManager } = await import('./daos/filesystem/ProductManager.js')
        productsService = new ProductManager("./products.json")
        req.logger.info("Servicio de productos cargado:");
        req.logger.info(productsService);
        break;

    default:
        req.logger.error("Persistencia no válida en la configuración:", config.persistence);
        process.exit(1); // Salir con código de error
        break;
}


export default { cartsService, productsService };