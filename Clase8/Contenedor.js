const fs = require('fs');

class Contenedor {
    constructor(product){
        this.product = product;
    }

    save = async (product) => {
        try {
            let products = this.getAll();
            let lastId=0
            products.forEach(element => {
                lastId = element.id
            });
            if (lastId === 0) {
                lastId = 1
            } else {
                lastId++
            }
            product.id = lastId
            products.push(product)
            await fs.promises.writeFile('productos.json', JSON.stringify(products, null, 2))
            console.log(`El ID del producto es: ${product.id}`);
        } catch (error) {
            console.log(`Error en lectura: ${error}`)
        }
    }

    getById(id){
        let products = this.getAll();
        return products.find(producto => producto.id === id) || null
    }

    getAll(){
        try {
            const data = fs.readFileSync('productos.json', 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            console.log(error);
        }
    }

    deleteById(id){
        const products = this.getAll()
        const deleted = products.filter(product => product.id !== id)
        try{
            fs.writeFileSync('productos.json', JSON.stringify(deleted,null,4))
        }catch(error){
            console.log(error);
        }
    }

    deleteAll(){
        const products = []
        try{
        fs.writeFileSync('productos.json', JSON.stringify(products,null,4))    
        }catch(error){
            console.log(error);
        }
    }

    getRandom(){
        const products = this.getAll()
        return products[Math.floor(Math.random()*products.length)]
    }

    updateById(id, product) {
        const datos = this.getAll();
        if(id <= 0 || id > datos.length) {
          return { error: "El producto con el id especificado no ha sido encontrado."}
        }
        product.id = id;
        const previousProduct = datos.splice(id - 1, 1, product);
        fs.writeFileSync(this.nombreArchivo, JSON.stringify(datos));
        return {
          previous: previousProduct,
          new: product
        }
      }
}

module.exports = Contenedor