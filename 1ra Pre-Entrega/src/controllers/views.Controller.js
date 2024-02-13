import { productModel } from "../models/product.model.js";

const login = async (req, res) => {
  res.render("login.hbs");
};

const inicioSesion = async (req, res) => {
  try {
    res.render("home.hbs", {
      user: req.session.user,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const realtimeproducts = async (req, res) => {
  try {
    res.render("realTimeProducts.hbs");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const chat = async (req, res) => {
  try {
    res.render("chat.hbs");
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const products = async (req, res) => {
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
    console.log("Papasasa", products);

    res.render("products", {
      products,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const session = async (req, res) => {
  if (req.session.counter) {
    req.session.counter++;
    res.send(`Se ha visitado este sitio ${req.session.counter} veces.`);
  } else {
    req.session.counter = 1;
    res.send("Bienvenido!!");
  }
};

const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.json({ error: "Error logout", msg: "Error al cerrar la session" });
    }
    res.render("Session cerrada !");
  });
};

const inicio = async (req, res) => {
  const { username, password } = req.query;

  if (username != "pepe" || password !== "123qwe") {
    return res.status(401).send("Login failed, check your credentianls");
  } else {
    req.session.user = username;
    req.session.admin = false;
    res.send("Login Successful!!");
  }
};

const rutePrivate = (req, res) => {
  res.send("Si estas viendo esto es porque estas autorizado a este recurso!");
};

export {
  login,
  inicioSesion,
  realtimeproducts,
  chat,
  products,
  session,
  logout,
  inicio,
  rutePrivate
};
