import express from "express";
import { Server } from "socket.io";
import router from "./routes/main.router.js";
import handlebars from "express-handlebars";
import __dirname from "./dirname.js";
import cors from 'cors';
import cookieParser from "cookie-parser";
import productDao from "./services/daos/mongo/product.dao.js";
import Handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import config from "./config/config.js";
import MongoStore from 'connect-mongo'
import session from 'express-session'
import MongoSingleton from './config/mongodb-singleton.js';


// Passport Imports
import passport from 'passport';
import initializePassport from './config/passport.config.js'

import { addLogger } from "./config/logger_CUSTOM.js";
import { userModel } from "./services/models/user.model.js";

//Socket Server
const app = express();
app.use(cors({
  credentials:true,
  origin:'http://localhost:5173'
}));


const MONGO_URL = config.mongoUrl

// Esta configuracion solo se usa si NO estoy usando una FACTORY
const mongoInstance = async () => {
  try {
      await MongoSingleton.getInstance();
  } catch (error) {
      console.error(error);
      process.exit();
  }
};
mongoInstance();

const deleteUserBy2Days = async () => {
  try {
    const response = await userModel.find();
    const fechaActual = new Date().toISOString();
    const cortFechaActual = fechaActual.slice(0, fechaActual.indexOf("T"));
    
    let usuariosEliminados = 0; 
    
    response.forEach(async (user) => {
      const separarFecha = user.created_at.toISOString();
      const trimmedString = separarFecha.slice(0, separarFecha.indexOf("T"));
      
      const diffDays = Math.floor((new Date(cortFechaActual) - new Date(trimmedString)) / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 2) {
        // Eliminar el usuario
        await userModel.findByIdAndDelete(user._id);
        console.log(`Usuario eliminado: ${user._id}`);
        usuariosEliminados++; // Incrementamos el contador de usuarios eliminados
      }
    });
    
    console.log("Proceso de eliminación de usuarios completado.");
  } catch (error) {
    console.error("Error al eliminar usuarios inactivos:", error);
  }
};


const httpServer = app.listen(config.port, () => {
  console.log("Servidor escuchando por el puerto: " + config.port);

  deleteUserBy2Days()
});

//Instancia websocket
const io = new Server(httpServer);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('Secreto'))

//Configuracion de plantilla de motor engine
app.engine(
  "hbs",
  handlebars.engine({
    // index.hbs
    extname: ".hbs",
    // Plantilla principal
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

//Seteamos nuestro motor
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//public
app.use(express.static(`${__dirname}/public`));


// Configuracion de Session
// app.use(session(
//   {

//       // Usando --> connect-mongo
//       store: MongoStore.create({
//           mongoUrl: MONGO_URL,
//           //mongoOptions --> opciones de confi para el save de las sessions
//           mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
//           ttl: 10 * 60
//       }),

//       secret: "coderS3cr3t",
//       resave: false, // guarda en memoria
//       saveUninitialized: true //lo guarda a penas se crea
//   }
// ))

// Middleware de passport

initializePassport();
app.use(passport.initialize());
// app.use(passport.session());

//Rutas
// **Logger
app.use(addLogger);
// Manejo de errores
app.use((err, req, res, next) => {
  req.logger.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(router);


const productsSer = new productDao();
//Socket communication
// io.on("connection", async (socket) => {
//   req.logger.info("Nuevo cliente conectado");

//   // Emitir todos los mensajes y productos al cliente que se acaba de conectar
//   const allMessages = await messageDao.getMessages();
//   const allProducts = await productsSer.getAllProducts();

//   socket.emit("products", allProducts);
//   socket.emit("messages", allMessages);

//   socket.on("product_send", async (data) => {
//     try {
//       await productsSer.createProduct(data);
//       // Obtener la lista actualizada de productos después de la creación
//       const updatedProducts = await productsSer.getAllProducts();
//       // Emitir la lista actualizada a todos los clientes
//       io.emit("products", updatedProducts);
//     } catch (error) {
//       req.logger.error(error);
//     }
//   });

//   socket.on("message", async (data) => {
//     try {
//       const newMessage = await messageDao.createMessage(data);
//       // Emitir el nuevo mensaje a todos los clientes, incluido el remitente
//       io.emit("message", newMessage);
//     } catch (error) {
//       req.logger.error("Error al guardar el mensaje en la base de datos:", error);
//     }
//   });

//   socket.on("inicio", async (data) => {
//     // Emitir evento "connected" a todos los clientes excepto al remitente
//     socket.broadcast.emit("connected", data);
//   });

//   // Emitir todos los mensajes al cliente recién conectado
//   socket.emit("messages", allMessages);
// });
