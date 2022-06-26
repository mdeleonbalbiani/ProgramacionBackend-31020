const libros = [];
const mascotas = [];

class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        console.log(`El nombre completo del usuario es ${this.nombre} ${this.apellido}`)
    } 

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota);
        console.log(`${nombreMascota} ha sido agragado a las mascotas del usuario`);
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(titulo, autor){
        const libro = {title: titulo, author: autor}
        this.libros = [...this.libros, libro]
        console.log(`El libro ${titulo} de ${autor} ha sido agregado a la lista del usuario`);
    }
 
    getBookNames(){
        const listaDeLibros = []
        this.libros.forEach(element => {
            listaDeLibros.push(element.title)
        });
        return listaDeLibros;
    }
}

const usuario = new Usuario("Martina", "De León", libros,mascotas)
usuario.getFullName();
usuario.addMascota("Zaira");
console.log(`El número de mascotas es: ${usuario.countMascotas()}`);
usuario.addBook("El resplandor", "Stephen King");
console.log(`Los libros que ha leído el usuario son: \n ${usuario.getBookNames()}`);