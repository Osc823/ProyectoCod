const registerPassportLocal =  async (req, res) => {
    console.log("Registrando usuario:");
    res.status(201).send({ status: "success", message: "Usuario creado con extito." });
}

const loginPassportLocal = async (req, res) => {
    console.log("User found to login:");

    const user = req.user;
    console.log(user);

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
}

export {
    registerPassportLocal,
    loginPassportLocal
}