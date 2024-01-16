import { Router } from 'express';

const routerUsers = Router();


routerUsers.get("/register", (req, res) => {
    res.render('register')
})

routerUsers.get("/", (req, res) => {
    res.render('profile', {
        user: req.session.user
    })
})

export default routerUsers;