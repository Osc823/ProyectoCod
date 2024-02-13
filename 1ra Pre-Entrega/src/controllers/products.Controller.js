import productDao from "../daos/dbManagerProduct/product.dao.js";

const allProducts = async (req, res) => {
  try {
    const { limit } = req.query;
    if (limit >= 1) {
      const products = await productDao.getAllProducts();
      const productWithLimit = products.slice(0, limit);
      res.json(productWithLimit);
    } else {
      const products = await productDao.getAllProducts();
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const productById = async (req, res) => {
  try {
    const { pid } = req.params;
    if (pid) {
      const response = await productDao.getProductById(pid);
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createNewProduct = async (req, res) => {
  try {
    await productDao.createProduct(req.body);
    res.json({ message: `Creado con exito` });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor." });
  }
};

const updateProductById = async (req, res) => {
  try {
    const { pid } = req.params;

    // Verificar si se proporciona un ID válido
    if (!pid) {
      return res.status(400).json({
        success: false,
        message: "Se requiere proporcionar un ID de producto válido.",
      });
    }

    // Obtener el resultado de la actualización
    const result = await productDao.updateProduct(pid, req.body);

    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor." });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { pid } = req.params;
    if (pid) {
      console.log("Numero que me llega", pid);
      const response = await productDao.deleteProduct(pid);
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { allProducts, productById, createNewProduct, updateProductById, deleteProductById };
