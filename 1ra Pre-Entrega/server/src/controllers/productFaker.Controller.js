import {generateFakeProduct} from "../dirname.js";

export const getProductsByFaker = async(req, res) => {
    try {
        let products = [];
        for (let i = 0; i < 100; i++) {
            products.push(generateFakeProduct());
        }
        res.send({ status: "success", payload: products });
    } catch (error) {
        req.logger.error(error);
        res.status(500).send({ error: error, message: "No se pudo obtener los usuarios:" });
    }
}