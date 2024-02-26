import config from "../config/config.js";
import MongoSingleton from "../config/mongodb-singleton.js"

let cartsService;
let productsService;  

async function initializeMongoService() {
    console.log("Iniciando Servicio para Mongo!!");
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
        console.log("Servicio de carrito cargado:");
        console.log(cartsService);

        const { default: ProductsServiceMongo } = await import('./daos/mongo/product.dao.js')
        productsService = new ProductsServiceMongo
        console.log("Servicio de productos cargado:");
        console.log(productsService);
        break;

    case 'file':
        // IMPORTARME le DAO
        const { CartManager } = await import('./daos/filesystem/Cart.js')
        cartsService = new CartManager("./carrito.json")
        console.log("Servicio de carrito cargado:");
        console.log(cartsService);

        const { ProductManager } = await import('./daos/filesystem/ProductManager.js')
        productsService = new ProductManager("./products.json")
        console.log("Servicio de productos cargado:");
        console.log(productsService);
        break;

    default:
        console.error("Persistencia no válida en la configuración:", config.persistence);
        process.exit(1); // Salir con código de error
        break;
}


export default { cartsService, productsService };