import fs from 'fs'

class Carts {
    constructor(path) {
      this.path = path;
    }
  
    async getCarts(queryObj) {
      const {limit}= queryObj
      try {
        if (fs.existsSync(this.path)) {
          const info = await fs.promises.readFile(this.path, 'utf-8');
          const cartsArray = JSON.parse(info)
          return limit ? cartsArray.slice(0,limit): cartsArray
        } else {
          return [];
        }
      } catch (error) {
        return error;
      }
    }
  
  
  
    async createCarts(obj) {
      try {
        const carts = await this.getCarts({});
        let id;
        if (!carts.length) {
          id = 1;
        } else {
          id = carts[carts.length - 1].id + 1;
        }
        carts.push({ id, ...obj });
        await fs.promises.writeFile(this.path, JSON.stringify(carts));
      } catch (error) {
        return error;
      }
    }
  
  
  
    async getCartsById(idCart) {
      try {
        const carts = await this.getCarts({});
        const cart = carts.find((p) => p.id === idCart);
       return cart
      } catch (error) {
        return error;
      }
    }
  
  
  
    async deleteCarts(idCart) {
      try {
        const carts = await this.deleteCarts();
        const newArrayCarts = carts.filter((c) => c.id !== idCart);
        await fs.promises.writeFile(this.path, JSON.stringify(newArrayCarts));
      } catch (error) {
        return error;
      }
    }
  
  
  
    async updateCart(id, updatedCart, fieldsToUpdate) {
      try {
        const carts = await this.getCarts();
        const cartIndex = carts.findIndex((c) => c.id === id);
  
        if (cartIndex !== -1) {
          const cartToUpdate = carts[cartIndex];
  
          for (const field of fieldsToUpdate) {
            if (field !== 'id') {
              cartToUpdate[field] = updatedCart[field];
            }
          }
  
          carts[cartIndex] = cartToUpdate;
          
          await fs.promises.writeFile(this.path, JSON.stringify(carts));
  
          return 'carrito actualizado correctamente';
        } else {
          return 'Producto no encontrado';
        }
      } catch (error) {
        return error;
      }
    }
  }
  

  // PRODUCTOS del carrito
const carrito1 = {
 title: 'producto prueba 1',
 price: 200,
};
//const carrito2 = {
//    title: 'producto prueba 2',
//    price: 200,
 // };


  //LA FUNCION TEST
async function test() {

//CREA UN json DE PRODUCTO
  const carrito1 = new Carts('Carts.json');


//const carts = await carrito1.getCarts();
//const cart = await carrito1.getCartById(2)


// CREA UN PRODUCTO COLOCANDO IN ID
 //
 //await carrito1.createCarts(carrito1);
 
  
//ELIMINA PRODUCTO del carrito
  await carrito1.deleteCarts(1);


//MOD. PRODUCTO del carro
 // const updatedCart = {
 //  title: 'Producto actualizado',
  //  price: 300,
   // stock: 30,
 // };
  //const fieldsToUpdate = ['title', 'price', 'stock'];
  //const result = await carrito1.updateCart(2, updatedCart, fieldsToUpdate);
 //console.log(result);
}

test();

export const cart = new Carts('Carts.json')