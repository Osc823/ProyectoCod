import express from 'express';
import {Server} from 'socket.io';
import router from './routes/main.router.js';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import { ProductManager } from './productManager/ProductManager.js';

//Socket Server
const app = express();
const PORT = 5000;

const httpServer = app.listen(PORT, () => {
    console.log(`Server listened on port ${PORT}`);
})

//Instancia websocket
const io = new Server(httpServer)

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuracion de plantilla de motor engine
app.engine("hbs", handlebars.engine({
    // index.hbs
    extname: ".hbs",
     // Plantilla principal
    defaultLayout:"main"
}))

//Seteamos nuestro motor
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//public
app.use(express.static(`${__dirname}/public`));

//Rutas
app.use(router)

//Instacia de la clase product Manager
const productManager = new ProductManager("./products.json")

const messages = [];
//Socket communication
io.on("connection", async (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on("product_send",async(data) => {
        try {
            await productManager.saveFile(data);
           
            socket.emit("products");
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("message", (data)=>{
        console.log(data);
        messages.push(data);
        io.emit("messages", messages)
    });

    socket.on("inicio",(data)=> {
        io.emit("messages", messages);
        socket.broadcast.emit("connected", data)
    })

    socket.emit("messages", messages)
    socket.emit("products", productManager.getProducts());
    
})



