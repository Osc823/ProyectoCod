import { Router } from "express";
import messageDao from "../daos/dbManagerMessage/message.dao.js";

const routerMessages = Router();

// Obtener todos los mensajes
routerMessages.get("/", async (req, res) => {
  try {
    const messages = await messageDao.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Crear un nuevo mensaje
routerMessages.post("/", async (req, res) => {
  const { username, messages } = req.body;
  try {
    const newMessage = await messageDao.createMessage(username, messages);
    res.json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Otros endpoints para actualizar y eliminar mensajes

export default routerMessages;
 