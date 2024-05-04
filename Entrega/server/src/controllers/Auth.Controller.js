import { generateJsonWToken } from "../dirname.js";
import { cartModel } from "../services/models/cart.model.js";
import { userModel } from "../services/models/user.model.js";

const registerPassportLocal = async (req, res) => {
    req.logger.info("Registrando usuario:");
    res.status(201).send({ status: "success", message: "Usuario creado con éxito." });
}

const loginPassportLocal = async (req, res) => {
    const user = req.user;
    const jwtoken =  {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        id: user._id,
        role: user.role,
        cartId: user.cartId,
    }
   
    const createToken = generateJsonWToken(jwtoken)


    res.cookie('jwtCookieToken', createToken, {
        maxAge: 6000000,
        httpOnly: true
    })


    try {
    
        // Actualizar la última vez que el usuario inició sesión
        await updateLastLogin(user._id);

        res.send({ status: "success", payload: req.user,  message: "¡Primer logueo realizado! :)" });
    } catch (error) {
        console.error("Error al verificar o crear el carrito:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
}

const updateLastLogin = async (userId) => {
    try {
      const user = await userModel.findById(userId);
      if (user) {
        user.created_at = new Date();
        await user.save();
      }
    } catch (error) {
      console.error("Error updating last login:", error);
    }
  };

  
const githubcallback =  async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    };
    req.session.admin = true;
    res.redirect("/home")
}



export {
    registerPassportLocal,
    loginPassportLocal,
    githubcallback
}
