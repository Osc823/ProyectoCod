// authorizationMiddleware.js

const isAdmin = (req, res, next) => {
  const user = req.user;

  if (user && user.role === "admin") {
    next(); // Usuario es administrador, permite el acceso.
  } else {
    res.status(403).json({ error: "Acceso no autorizado" });
  }
};

const isUser = (req, res, next) => {
  const user = req.user;

  if (user && user.role === "user") {
    next(); // Usuario es normal, permite el acceso.
  } else {
    res.status(403).json({ error: "Acceso no autorizado" });
  }
};

export { isAdmin, isUser };
