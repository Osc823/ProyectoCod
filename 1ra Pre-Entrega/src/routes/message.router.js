import { Router } from "express";
import { getAllMessages, createNewMessage } from "../controllers/messages.Controller.js";

const routerMessages = Router();

// Obtener todos los mensajes
routerMessages.get("/", getAllMessages);

// Crear un nuevo mensaje
routerMessages.post("/", createNewMessage);

// Otros endpoints para actualizar y eliminar mensajes

export default routerMessages;
 