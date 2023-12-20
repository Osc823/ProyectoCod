import { messageModel } from "../../models/message.model.js";

class MessageDao {
  // Obtener todos los mensajes
  async getMessages() {
    try {
      return await messageModel.find();
    } catch (error) {
      console.error("Error al obtener mensajes:", error.message);
      throw error;
    }
  }

  // Obtener un mensaje por su ID
  async getMessageById(id) {
    try {
      return await messageModel.findById(id);
    } catch (error) {
      console.error(`Error al obtener el mensaje con ID ${id}:`, error.message);
      throw error;
    }
  }

  // Crear un nuevo mensaje
  async createMessage(username, message) {
    try {
      return await messageModel.create({ username, messages: message });
    } catch (error) {
      console.error("Error al crear mensaje:", error.message);
      throw error;
    }
  }

  // Actualizar un mensaje por su ID
  async updateMessage(id, newMessage) {
    try {
      return await messageModel.findByIdAndUpdate(id, { messages: newMessage });
    } catch (error) {
      console.error(`Error al actualizar el mensaje con ID ${id}:`, error.message);
      throw error;
    }
  }

  // Eliminar un mensaje por su ID
  async deleteMessage(id) {
    try {
      return await messageModel.findByIdAndDelete(id);
    } catch (error) {
      console.error(`Error al eliminar el mensaje con ID ${id}:`, error.message);
      throw error;
    }
  }
}

export default new MessageDao();
