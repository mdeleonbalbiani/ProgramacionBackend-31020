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
            await fs.promises.writeFile('productos.txt', JSON.stringify(products, null, 2))
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
            const data = fs.readFileSync('productos.txt', 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            console.log(error);
        }
    }

    deleteById(id){
        const products = this.getAll()
        const deleted = products.filter(product => product.id !== id)
        try{
            fs.writeFileSync('productos.txt', JSON.stringify(deleted,null,4))
        }catch(error){
            console.log(error);
        }
    }

    deleteAll(){
        const products = []
        try{
        fs.writeFileSync('productos.txt', JSON.stringify(products,null,4))    
        }catch(error){
            console.log(error);
        }
    }
}

module.exports = Contenedor