import { userModel } from "../services/models/user.model.js";

// Trae a todos los usuarios
const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await userModel.find();
    res.status(200).json({ success: true, payload: allUsers });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Buscar Usuario por correo
const searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Buscar al usuario por su correo electrónico en la base de datos
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, error: "Usuario no encontrado" });
    }

    // Si se encuentra el usuario, enviarlo como respuesta
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Error al buscar usuario por correo electrónico:', error);
    res.status(500).json({ success: false, error: 'Error interno del servidor' });
  }
};

// Eliminar un usuario permanentemente
const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const userDestroy = await userModel.findOneAndDelete({ _id: id });
    if (userDestroy) {
      res.status(200).json("Usuario eliminado con éxito");
    } else {
      throw new Error("Usuario no encontrado con ID " + id);
    }
  } catch (error) {
    console.error(error)
    res.status(404).json(`Usuario ${id} no ha podido ser eliminado`);
  }
};

// Suspender un usuario temporalmente o "borrado lógico"
const sleepUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndUpdate(id, { hide: false }, { new: true });
    res.status(200).json(`Usuario suspendido con éxito: ${user}`);
  } catch (error) {
    console.error(error);
    res.status(400).json(`No se pudo suspender el usuario: ${error.message}`);
  }
};

// Restaurar un usuario suspendido
const restoreUserByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndUpdate(id, { hide: true }, { new: true });
    res.status(200).json(`Usuario restaurado con éxito: ${user}`);
  } catch (error) {
    console.error(error);
    res.status(400).json(`No se pudo restaurar el usuario: ${error.message}`);
  }
};

// Dar permisos de administrador
const allowAdminPermissionsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }
    user.role = "admin";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

// Quitar permisos de administrador
const forbidAdminPermissionsHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }
    user.role = "user";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

//Dar permisos de usuario premiun
const allowUserPremiunHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }
    user.role = "premium";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};
//Quitar permisos de usuario premiun
const allowUserNoPremiunHandler =async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json("Usuario no encontrado");
    }
    user.role = "user";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Error interno del servidor");
  }
};

export {
  searchUserByEmail,
  deleteUserHandler,
  sleepUserByIdHandler,
  restoreUserByIdHandler,
  forbidAdminPermissionsHandler,
  allowAdminPermissionsHandler,
  getAllUsersController,
  allowUserPremiunHandler,
  allowUserNoPremiunHandler
};
