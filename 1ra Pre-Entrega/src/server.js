import express from "express";
import { Server } from "socket.io";
import router from "./routes/main.router.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import mongoose from "mongoose";
import { password, PORT, db_name } from "./env.js";
import productDao from "./daos/dbManagerProduct/product.dao.js";
import messageDao from "./daos/dbManagerMessage/message.dao.js";


//Socket Server
const app = express();


mongoose.connect(`mongodb+srv://osbussiness93:${password}@cluster0.l8galgu.mongodb.net/${db_name}?retryWrites=true&w=majority`)
.then(() => {
  console.log('DB Conect');
})
.catch((error)=> {
  console.log('Hubo un error');
})


const httpServer = app.listen(PORT, () => {
  console.log(`Server listened on port ${PORT}`);
});

//Instancia websocket
const io = new Server(httpServer);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuracion de plantilla de motor engine
app.engine(
  "hbs",
  handlebars.engine({
    // index.hbs
    extname: ".hbs",
    // Plantilla principal
    defaultLayout: "main",
  })
);

//Seteamos nuestro motor
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//public
app.use(express.static(`${__dirname}/public`));

//Rutas
app.use(router);



//Socket communication
io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  // Emitir todos los mensajes y productos al cliente que se acaba de conectar
  const allMessages = await messageDao.getMessages();
  const allProducts = await productDao.getAllProducts();

  socket.emit("products", allProducts);
  socket.emit("messages", allMessages);

  socket.on("product_send", async (data) => {
    try {
      await productDao.createProduct(data);
      // Obtener la lista actualizada de productos después de la creación
      const updatedProducts = await productDao.getAllProducts();
      // Emitir la lista actualizada a todos los clientes
      io.emit("products", updatedProducts);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("message", async (data) => {
    try {
      const newMessage = await messageDao.createMessage(data);
      // Emitir el nuevo mensaje a todos los clientes, incluido el remitente
      io.emit("message", newMessage);
    } catch (error) {
      console.error("Error al guardar el mensaje en la base de datos:", error);
    }
  });

  socket.on("inicio", async (data) => {
    // Emitir evento "connected" a todos los clientes excepto al remitente
    socket.broadcast.emit("connected", data);
  });

  // Emitir todos los mensajes al cliente recién conectado
  socket.emit("messages", allMessages);
});
