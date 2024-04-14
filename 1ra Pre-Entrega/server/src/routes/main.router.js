import { Router } from "express";
import { isAdmin, isUser } from "../middleware/authorizationMiddleware.js";

import routerProducts from "./products.router.js";
import routerCarts from "./carts.router.js";
import viewsRouter from "./views.router.js";
import routerMessages from "./message.router.js";
import routerUsers from "./users.router.js";
import routerSession from "./sessions.router.js";
import githubLoginViewRouter from "./github-login.router.js";
import emailRouter from "./email.router.js";
import { getProductsByFaker } from "../controllers/productFaker.Controller.js";

const router = Router();

// Rutas accesibles solo por administradores
router.use("/api/products", routerProducts);

//Rutas de Mockingproducts con Faker
router.use("/mockingproducts", getProductsByFaker);

// Rutas accesibles solo por usuarios
router.use("/api/carts", routerCarts);
router.use("/api/messages", isUser, routerMessages);
router.use("/users", routerUsers);

// Rutas accesibles por ambos roles
router.use("/api/sessions", routerSession);

// Rutas de vistas (públicas)
router.use("/", viewsRouter);

// Rutas para autenticación con Github
router.use("/github", githubLoginViewRouter);

//Ruta para enviar correos
router.use("/api/email", emailRouter);

// Puntos importantes del servidor
router.get("/loggerTest", (req, res) => {
  req.logger.info("This is an info log.");
  req.logger.warning("This is a warning log.");
  req.logger.error("This is an error log.");
  res.send("Check logs!");
});

export default router;
