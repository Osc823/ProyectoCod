import express from "express";
import { Server } from "socket.io";
import router from "./routes/main.router.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import mongoose from "mongoose";
import { password, PORT, db_name } from "./env.js";
import productDao from "./daos/dbManagerProduct/product.dao.js";

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


const messages = [];
//Socket communication
io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("product_send", async (data) => {
    try {
      await productDao.saveFile(data);

      socket.emit("products");
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("message", (data) => {
    console.log(data);
    messages.push(data);
    io.emit("messages", messages);
  });

  socket.on("inicio", (data) => {
    io.emit("messages", messages);
    socket.broadcast.emit("connected", data);
  });

  socket.emit("messages", messages);
  socket.emit("products", productDao.getAllProducts());
});
