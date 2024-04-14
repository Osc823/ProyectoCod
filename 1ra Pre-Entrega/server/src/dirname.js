import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

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

export default __dirname;