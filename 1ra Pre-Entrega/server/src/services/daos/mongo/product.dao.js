import { productModel } from "../../models/product.model.js";

class ProductDao {
  async getAllProducts() {
    return await productModel.find();
  }

  async getProductById(id) {
    return await productModel.findById(id);
  }

  async createProduct(product) {
    return await productModel.create(product);
  }

  async updateProduct(id, product) {
    return await productModel.findByIdAndUpdate(id, product);
  }

  async deleteProduct(id) {
    return await productModel.findByIdAndDelete(id);
  }
}

export default ProductDao;