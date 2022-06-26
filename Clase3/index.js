const  Contenedor =  require('./Contenedor')

const product = new Contenedor([])

//Save product
product.save({
    'title':'product',
    'price':100,
    'thumbnail':"https://cdn4.iconfinder.com/data/icons/business-solid-the-capitalism/64/Product_delivery-512.png"
});
//Get product by ID
//console.log(product.getById(1))
//Delete product by ID
//product.deleteById(1)
//Get all
//console.log(product.getAll())
//Delete all
//product.deleteAll()
