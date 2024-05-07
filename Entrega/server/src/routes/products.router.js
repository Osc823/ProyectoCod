import { Router } from "express";
import { allProducts, createNewProduct, deleteProductById, productById, updateProductById } from "../controllers/products.Controller.js";
import { authorization, passportCall } from "../dirname.js";

const routerProducts = Router();

routerProducts.get("/", allProducts);

routerProducts.get("/:pid", productById);

routerProducts.post("/", passportCall("JWT"), authorization(["premium","admin"]), createNewProduct);

routerProducts.put("/:pid/update",passportCall("JWT"), authorization(["premium"]), updateProductById);

routerProducts.delete("/:pid/delete",passportCall("JWT"), authorization(["premium"]), deleteProductById);

export default routerProducts;
