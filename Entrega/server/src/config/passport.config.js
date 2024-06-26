import passport from "passport";
import passportLocal, { Strategy } from "passport-local";
import GitHubStrategy from "passport-github2";
import { userModel } from "../services/models/user.model.js";
import { createHash, isValidPassword } from "../dirname.js";
import { cartModel } from "../services/models/cart.model.js";
import CartRepository from "../services/repository/cart.repository.js";
import { cartsService } from "../services/service.js";
import jwtStrategy from "passport-jwt";
import config from "./config.js";


//  Declaramos estrategia
const localStrategy = passportLocal.Strategy;

const JWTStrategy = jwtStrategy.Strategy;

const extractJWT = jwtStrategy.ExtractJwt;



const initializePassport = () => {


  // Usando GitHub
  passport.use(
    "github",
    new GitHubStrategy(
      {
        clientID: "Iv1.f6ff78b659c4bf51",
        clientSecret: "59f865f819ade970045504a219dd796bfcafff5b",
        callbackUrl: "http://localhost:5000/api/sessions/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("Profile obtenido del usuario de GitHub: ");
        console.log(profile);
        try {
          //Validamos si el user existe en la DB
          const user = await userModel.findOne({ email: profile._json.email });
          console.log("Usuario encontrado para login:");
          console.log(user);
          if (!user) {
            console.warn(
              "User doesn't exists with username: " + profile._json.email
            );
            let newUser = {
              first_name: profile._json.name,
              last_name: "",
              age: 28,
              email: profile._json.email,
              password: "",
              loggedBy: "GitHub",
            };
            const result = await userModel.create(newUser);
            return done(null, result);
          } else {
            // Si entramos por aca significa que el user ya existe en la DB
            return done(null, user);
          }
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  /**
   *  Inicializando la estrategia local, username sera para nosotros email.
   *  Done será nuestro callback
   */

  passport.use(
    "register",
    new localStrategy(
      // passReqToCallback: para convertirlo en un callback de request, para asi poder iteracturar con la data que viene del cliente
      // usernameField: renombramos el username
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, email, age } = req.body;
        try {
          //Validamos si el user existe en la DB
          const exist = await userModel.findOne({ email });
          if (exist) {
            console.log("El user ya existe!!");
            done(null, false);
          }

          const createCart = await cartsService.createCart();

          const user = {
            first_name,
            last_name,
            email,
            age,
            cartId: createCart._id,
            password: createHash(password),
          };
          const result = await userModel.create(user);
          // Todo sale ok
          return done(null, result);
        } catch (error) {
          return done("Error registrando al usuario " + error);
        }
      }
    )
  );

  //Estrategia de Login:
  passport.use(
    "login",
    new localStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.warn("User doesn't exists with username: " + username);
            return done(null, false);
          }
          if (!isValidPassword(user, password)) {
            console.warn("Invalid credentials for user: " + username);
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
 
  //Estrategia para desencriptar el JWT
  passport.use("JWT", new JWTStrategy(
    {
      jwtFromRequest: extractJWT.fromExtractors([cookieExtractor]),
      secretOrKey: config.tokenKey
    },
    async(jwt_payload, done)=>{
      console.log('Descriptando el usuario',jwt_payload);
      return done(null, jwt_payload.user)
    }
  ))

  //Funciones de Serializacion y Desserializacion
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      console.error("Error deserializando el usuario: " + error);
    }
  });

  // estas funciones permiten a Passport.js manejar la información del usuario durante el proceso de autenticación, serializando y deserializando los usuarios para almacenar y recuperar información de la sesión. Estas funciones son esenciales cuando se implementa la autenticación de usuarios en una aplicación Node.js utilizando Passport.js.
};
const cookieExtractor = req => {
  let token = null;
  console.log("Entrando a Cookie Extractor");
  if (req && req.cookies) { //Validamos que exista el request y las cookies.
      console.log("Cookies presentes: ");
      console.log(req.cookies);
      token = req.cookies['jwtCookieToken']; //-> Tener presente este nombre es el de la Cookie.
      console.log("Token obtenido desde Cookie:");
      console.log(token);
  }
  return token;
};


export default initializePassport;
