import { Router } from "express";
import { allProducts, createNewProduct, deleteProductById, productById, updateProductById } from "../controllers/products.Controller.js";

const routerProducts = Router();

routerProducts.get("/", allProducts);

routerProducts.get("/:pid", productById);

routerProducts.post("/", createNewProduct);

routerProducts.put("/:pid", updateProductById);

routerProducts.delete("/:pid", deleteProductById);

export default routerProducts;
