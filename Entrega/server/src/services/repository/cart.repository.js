export default class CartRepository{
    constructor(dao) {
        this.dao = dao;
    }
    getCarts = () => {
        return this.dao.getCarts();
    }
    getCartById = (id) => {
        return this.dao.getCartById(id);
    }
    createCart = () => {
        return this.dao.createCart({ products: [] });
    }
    updateProduct = (id, product) => {
        return this.dao.updateProduct(id, product);
    }
    deleteProduct = (id) => {
        return this.dao.deleteProduct(id);
    }
    addToCart = (cartId, productId, userId) => {
        return this.dao.addToCart(cartId, productId, userId)
    }
    decreaseProductInCart = (cartId, productId) => {
        return this.dao.decreaseProductInCart(cartId, productId)
    }
    getAllProducts =(cartId) => {
        return this.dao.getAllProducts(cartId)
    }
    deleteProducInCart = (cartId, productId) =>{
        return this.dao.deleteProducInCart(cartId, productId)
    }
}