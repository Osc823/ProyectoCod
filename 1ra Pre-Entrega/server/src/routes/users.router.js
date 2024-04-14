import { Router } from 'express';
import { userModel } from '../services/models/user.model.js';

const routerUsers = Router();

routerUsers.get('/byEmail/:email', async (req,res )=> {
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

})

routerUsers.get("/register", (req, res) => {
    res.render('register')
})

routerUsers.get("/", (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
})

export default routerUsers;