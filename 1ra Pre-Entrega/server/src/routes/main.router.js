import { Router } from "express";
import routerProducts from "./products.router.js";
import routerCarts from "./carts.router.js";
import viewsRouter from "./views.router.js";
import routerMessages from "./message.router.js";
import routerUsers from "./users.router.js";
import routerSession from "./sessions.router.js";
import githubLoginViewRouter from './github-login.router.js'

const router = Router();

router.use('/', viewsRouter)
router.use('/api/products', routerProducts)
router.use('/api/carts', routerCarts)
router.use('/api/messages', routerMessages)
router.use('/users', routerUsers)
router.use('/api/sessions', routerSession)
router.use("/github", githubLoginViewRouter)

export default router;