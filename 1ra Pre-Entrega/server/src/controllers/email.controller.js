import nodemailer from "nodemailer";
import config from "../config/config.js";
import __dirname from "../dirname.js";

// configuracion de transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: config.gmailAccount,
    pass: config.gmailAppPassword,
  },
});

console.log("Configurac", config);

// Verificamos conexion con gmail
transporter.verify(function (error, success) {
  if (error) {
    console.log("Cual es el error?", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

export const sendEmail = (req, res) => {
    const { email, nombre, password } = req.body;
    console.log('paramas',email);
  
    try {
      // Destructurar las opciones de correo para mayor claridad
      const mailOptions = {
        from: "Coder Test - " + config.gmailAccount,
        to: email,
        subject: "Bienvenido a THE BEST SHOP",
        html:
           `<div>
              <h1>¡Bienvenido a THE BEST SHOP!</h1>
  
              <p>Hola, ${nombre}.</p>
  
              <p>Nos complace darte la bienvenida a nuestra comunidad. Te has registrado con éxito en THE BEST SHOP!🥹.</p>
  
              <p>Tu contraseña es: **${password}**</p>
  
          </div>`,
        attachments: [],
      };
  
      // Enviar correo electrónico usando transporter y manejar la respuesta
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          return res.status(400).send({ message: "Error", payload: error });
        }
  
        console.log("Mensaje enviado:", info.messageId);
        res.send({ message: "Success", payload: info });
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({
          error: error,
          message: "No se pudo enviar el email desde:" + config.gmailAccount,
        });
    }
  };

const mailOptionsWithAttachments = {
  from: "Coder Test - " + config.gmailAccount,
  to: `${config.gmailAccount};oscar00gaona@gmail.com; seleccion.alcantara145@gmail.com`,
  subject: "Correo de prueba CoderHouse Pkrogramacion BackEnmd clase30",
  html: `<div>
                <h1>Esto es un Test de envio de correos con Nodemailer!</h1>
                <p>Ahora usando imagenes: </p>
                <img src="cid:carro"/>
            </div>`,
  attachments: [
    {
      filename: "Carro Increible",
      path: __dirname + "/public/images/carro.png",
      cid: "carro",
    },
  ],
};



export const sendEmailWithAttachments = (req, res) => {
  try {
    let result = transporter.sendMail(
      mailOptionsWithAttachments,
      (error, info) => {
        if (error) {
          console.log(error);
          res.status(400).send({ message: "Error", payload: error });
        }
        console.log("Message sent: %s", info.messageId);
        res.send({ message: "Success", payload: info });
      }
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        error: error,
        message: "No se pudo enviar el email desde:" + config.gmailAccount,
      });
  }
};
