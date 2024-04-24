import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import jwt from "jsonwebtoken";
import config from './config/config.js';
import passport from "passport";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
faker.locale = 'es'; //Idioma de los datos

// Generamos el hash
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validamos el hash
export const isValidPassword = (user, password) => {
  console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    // console.log('Bycrtpera', bcrypt.compareSync(password, user.password));
    return bcrypt.compareSync(password, user.password);
}

export const generateFakeProduct = () => {
    return {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      thumbnail: faker.image.image(),
      code: faker.database.mongodbObjectId(),
      stock: faker.datatype.number({ min: 1, max: 1000 })
    };
};

export const generateJsonWToken = (user) => {
  return jwt.sign({user},config.tokenKey,{expiresIn:"4h"})
}

export const authorization = (roles) => {
  return async(req, res, next) => {
    if (req.user.isAdmin !== true) {
      if (!req.user) {
        return res.status(401).send('No autorizado pa!')
      }
      if (!roles.includes(req.user.role)) {
        return res.status(403).send('No autorizado pa!')
      }
      next()
    }
    next()
  }
}

export const passportCall = (strategy) => {
  return async(req, res, next) => {
    console.log('Passportcall');
    passport.authenticate(strategy, function(err, user, info){
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).send("Usuario no esta logueado!")
      }
      req.user = user
      console.log('User', req.user);
      next()
    })(req, res, next)
  }
}

export default __dirname;