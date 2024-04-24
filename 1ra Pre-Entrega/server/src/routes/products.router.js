import { Router } from "express";
import { allProducts, createNewProduct, deleteProductById, productById, updateProductById } from "../controllers/products.Controller.js";
import { authorization, passportCall } from "../dirname.js";

const routerProducts = Router();

routerProducts.get("/", allProducts);

routerProducts.get("/:pid", productById);

routerProducts.post("/", passportCall("JWT"), authorization(["premiun"]), createNewProduct);

routerProducts.put("/:pid",passportCall("JWT"), authorization(["premiun"]), updateProductById);

routerProducts.delete("/:pid",passportCall("JWT"), authorization(["premiun"]), deleteProductById);

export default routerProducts;
