import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

// Generamos el hash
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Validamos el hash
export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    // console.log('Bycrtpera', bcrypt.compareSync(password, user.password));
    return bcrypt.compareSync(password, user.password);
}


export default __dirname;