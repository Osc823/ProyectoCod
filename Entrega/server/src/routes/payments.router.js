import { Router } from "express";
import { passportCall } from "../dirname.js";
import stripe from 'stripe';
import { productModel } from "../services/models/product.model.js";

const stripeInstance = stripe(process.env.STRIPE_APP_SECRET_KEY);

const router = Router();

router.post('/create-checkout-session', passportCall("JWT"), async(req, res)=> {
  const { products } = req.body;
  
  try {
    // Obtener los precios de los productos de la base de datos
    const productPrices = await Promise.all(products.map(async (product) => {
      const productData = await productModel.findById(product.product);
      if (!productData) {
        throw new Error(`No se encontró el producto con ID: ${product.product}`);
      }
      console.log('PRODSDSDS', productData);
      return {
        ...product,
        price: productData.price ,// Añadir el precio del producto al objeto
        thumbnail:productData.thumbnail,
        title:productData.title
      };
    }));

    // Construir los line_items con los precios obtenidos
    console.log('PRODUDCS', productPrices);
    const lineItems = productPrices.map((product) => ({
      price_data: {
        currency: "usd",
        unit_amount: product.price*100,
        product_data: {
          name: product.title, 
          images: [product.thumbnail]
        },
      },
      quantity: product.quantity
    }));

    // Crear la sesión de pago con los line_items
    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:5173/cart",
      cancel_url: "http://localhost:5173/cart",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error al crear la sesión de pago:", error);
    res.status(500).json({ error: "Error al crear la sesión de pago" });
  }
});




export default router;
