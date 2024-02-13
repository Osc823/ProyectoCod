import messageDao from "../daos/dbManagerMessage/message.dao.js";

const getAllMessages = async (req, res) => {
    try {
      const messages = await messageDao.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
}
const createNewMessage =  async (req, res) => {
    const { username, messages } = req.body;
    try {
      const newMessage = await messageDao.createMessage(username, messages);
      res.json(newMessage);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

export {
    getAllMessages,
    createNewMessage
}