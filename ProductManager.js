//SEGUNDO DESAFIO

const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const info = await fs.promises.readFile(this.path, 'utf-8');
        return JSON.parse(info);
      } else {
        return [];
      }
    } catch (error) {
      return error;
    }
  }



  async createProduct(obj) {
    try {
      const products = await this.getProducts();
      let id;
      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }
      products.push({ id, ...obj });
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      return error;
    }
  }



  async getProducById(idProduct) {
    try {
      const products = await this.getProducts();
      const product = products.find((p) => p.id === idProduct);
      if (product) {
        return product;
      } else {
        return 'not product';
      }
    } catch (error) {
      return error;
    }
  }



  async deleteProduct(idProduct) {
    try {
      const products = await this.getProducts();
      const newArrayProducts = products.filter((p) => p.id !== idProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(newArrayProducts));
    } catch (error) {
      return error;
    }
  }



  async updateProduct(id, updatedProduct, fieldsToUpdate) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((p) => p.id === id);

      if (productIndex !== -1) {
        const productToUpdate = products[productIndex];

        for (const field of fieldsToUpdate) {
          if (field !== 'id') {
            productToUpdate[field] = updatedProduct[field];
          }
        }

        products[productIndex] = productToUpdate;
        
        await fs.promises.writeFile(this.path, JSON.stringify(products));

        return 'Producto actualizado correctamente';
      } else {
        return 'Producto no encontrado';
      }
    } catch (error) {
      return error;
    }
  }
}



// PRODUCTOS
const product1 = {
  title: 'producto prueba 1',
  description: 'Este es un producto prueba',
  price: 200,
  thumbnail: 'sin img',
  code: 'abc123',
  stock: 25,
};
const product2 = {
    title: 'producto prueba 2',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'sin img',
    code: 'abc123',
    stock: 25,
  };


  //LA FUNCION TEST
async function test() {

//CREA UN json DE PRODUCTO
  const manager1 = new ProductManager('Products.json');


//const products = await manager1.getProducts();
//const product = await manager1.getProducById(2)


// CREA UN PRODUCTO COLOCANDO IN ID
 // await manager1.createProduct(product2);
 
  
//ELIMINA PRODUCTO
 // await manager1.deleteProduct(2);


//MOD. PRODUCTO
  const updatedProduct = {
   title: 'Producto actualizado',
    price: 300,
    stock: 30,
  };
  const fieldsToUpdate = ['title', 'price', 'stock'];
  const result = await manager1.updateProduct(2, updatedProduct, fieldsToUpdate);
 console.log(result);
}

test();
