import { Router } from "express";
import { isAdmin, isUser } from "../middleware/authorizationMiddleware.js"; 

import routerProducts from "./products.router.js";
import routerCarts from "./carts.router.js";
import viewsRouter from "./views.router.js";
import routerMessages from "./message.router.js";
import routerUsers from "./users.router.js";
import routerSession from "./sessions.router.js";
import githubLoginViewRouter from './github-login.router.js'

const router = Router();

// Rutas accesibles solo por administradores
router.use('/api/products', isAdmin, routerProducts);

// Rutas accesibles solo por usuarios
router.use('/api/carts', isUser, routerCarts);
router.use('/api/messages', isUser, routerMessages);
router.use('/users', routerUsers);

// Rutas accesibles por ambos roles
router.use('/api/sessions', routerSession);

// Rutas de vistas (públicas)
router.use('/', viewsRouter);

// Rutas para autenticación con Github
router.use("/github", githubLoginViewRouter);

export default router;
