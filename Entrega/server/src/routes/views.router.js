import { Router } from "express";
import { productModel } from "../services/models/product.model.js";

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
  res.render('login.hbs')
})

viewsRouter.get("/home", (req, res) => {
  try {
    res.render("home.hbs", {
      user: req.session.user
  });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

viewsRouter.get("/realtimeproducts", (req, res) => {
  try {
    res.render("realTimeProducts.hbs");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

viewsRouter.get("/chat", (req, res) => {
  try {
    res.render("chat.hbs");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

viewsRouter.get("/products", async (req, res) => {
  try {
    const { page, limit } = req.query;
    const products = await productModel.paginate(
      {},
      {
        page: page || 1,
        limit: limit || 10,
      }
    );
    // .sort({ price: 1})
   

    res.render("products", {
      products,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

viewsRouter.get('/session', (req, res) => {
  if (req.session.counter) {
      req.session.counter++
      res.send(`Se ha visitado este sitio ${req.session.counter} veces.`)
  } else {
      req.session.counter = 1
      res.send('Bienvenido!!')
  }
});


viewsRouter.get('/logout', (req, res) => {
  req.session.destroy(error => {
      if (error) {
          res.json({ error: 'Error logout', msg: "Error al cerrar la session" })
      }
      res.render('Session cerrada !')
    })
});


viewsRouter.get('/login', (req, res) => {

  const { username, password } = req.query

  if (username != 'pepe' || password !== '123qwe') {
      return res.status(401).send("Login failed, check your credentianls")
  } else {
      req.session.user = username;
      req.session.admin = false;
      res.send('Login Successful!!')
  }
});

// Middleare auth
function auth(req, res, next) {
  if (req.session.user === 'pepe' && req.session.admin) {
      return next()
  } else {
      return res.status(403).send("Usuario no autorizado para ingresar a este recurso.");
  }
}


viewsRouter.get('/private', auth, (req, res) => {
  res.send('Si estas viendo esto es porque estas autorizado a este recurso!')
});

export default viewsRouter;
