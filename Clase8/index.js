const express = require("express");
const app = express();
const router = express.Router();

const Contenedor = require("./Contenedor");
const contenedor1 = new Contenedor("productos.json");

app.use("/api/productos", router);
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

router.get("/", (req, res) => {
  const { id } = req.query;
  if(id != undefined) {
    res.json(contenedor1.getById(Number(id)));
  } else {
    res.json(contenedor1.getAll());
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json(contenedor1.getById(Number(id)));
});

router.post("/", (req, res) => {
  const { nombre, precio, imagen } = req.body;
  if(nombre === "" || precio === "" || imagen === "") {
    res.json({
      error: "Alguno de los campos ha quedado sin rellenar"
    });
  } else {
    res.json(contenedor1.save({ nombre: nombre, precio: Number(precio), imagen: imagen}));
  }
});

router.put("/:id", (req, res) => {
  const producto = req.body;
  const { id } = req.params;
  res.json(contenedor1.updateById(Number(id), producto));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json(contenedor1.deleteById(Number(id)));
})

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", error => console.log(`Error en servidor: ${error}`));