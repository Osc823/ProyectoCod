import { Router } from 'express';

import { allowAdminPermissionsHandler, deleteUserHandler, forbidAdminPermissionsHandler, restoreUserByIdHandler, searchUserByEmail, sleepUserByIdHandler } from '../controllers/users.Controller.js';

const routerUsers = Router();

routerUsers.get("/register", (req, res) => {
  res.render('register')
})

routerUsers.get("/", (req, res) => {
  res.render('profile', {
      user: req.session.user
  })
})

routerUsers.get('/byEmail/:email', searchUserByEmail)
//Eliminar usuario
routerUsers.delete("/delete/:id", deleteUserHandler);
// Suspender usuario
routerUsers.patch("/sleep/:id", sleepUserByIdHandler);
// Restaurar usuario
routerUsers.patch("/restore/:id", restoreUserByIdHandler);
//Dar permisos de administrador
routerUsers.patch("/admin/:id", allowAdminPermissionsHandler)
//Quitar permisos de administrador
routerUsers.patch("/noadmin/:id", forbidAdminPermissionsHandler)



export default routerUsers;