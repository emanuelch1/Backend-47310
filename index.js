//PRIMER DESAFIO


class ProductManager {

    constructor(){
        this.products = [];
  }

  addProduct(title,description,price,thumbnail,code,stock) {

    const product = {
        id: this.products.length ? this.products[this.products.length-1].id+1 : 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
    }
    this.products.push(product);
    
  }
  getProducts() {
    return this.products;
}

getProductById(id) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
        return 'Not found'
} }
};

const manager = new ProductManager();
manager.addProduct("Producto Prueba", "Este es un producto prueba", 200, "sin img", "ABC123", 25);

const allProducts = manager.getProducts();
console.log(allProducts);

const productById = manager.getProductById(2); 
if (productById) {
    console.log(productById);
}







