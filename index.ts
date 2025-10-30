import axios = require("axios");
import express = require("express");
import cors = require("cors");

type libro = {
    id: number,
  title: string,
  author: string,
  pages: number
}

let libros:libro[] = [{
    id: 1,
    title: "El camino de los reyes",
    author: "Brandon Sanderson",
    pages: 1000,
},
{
    id: 2,
    title: "Juramentada",
    author: "Brandon Sanderson",
    pages: 1300,
},
{
    id: 3,
    title: "El temor de un hombre sabio",
    author: "Patric Rothfuss",
    pages: 900,
},
]

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/books",(req, res)=>{
    try{
    res.status(200).json(libros)
    }catch(error){
    res.status(400).json("Libros no encontrados")
    }
});

app.post("/api/books", (req, res)=>{
    
    const nuevoDisco:libro = {
        id: Date.now().toString(),
        ...req.body
    }
    try{
      libros.push(nuevoDisco);
      res.status(201).json(nuevoDisco);
    } catch(Error){
        res.status(400).json("Error al añadir libro");
    }
    
    
});

app.put("/api/books/:id", (req,res)=>{
    const id = Number(req.params.id);
    const libroActualizado:libro = {
        id: id,
        ...req.body
    }
    try{
    libros = libros.map((libro) =>{
        libro.id === id
        return libro = libroActualizado;
    } );
    res.status(200).json(libros.find(l => l.id === id));
    }catch(error){
        res.status(400).json("Error al actualizar libro");
    }

})

app.delete("/api/books/:id", (req, res) =>{
     const id = Number(req.params.id);
     const librosSinLibroAEliminar = libros.filter((libro)=> libro.id !== id);
     try{
        libros = librosSinLibroAEliminar;
        res.status(201).json(librosSinLibroAEliminar);
     }catch(error){
        res.status(404).json("Libro no encontrado");
     }
})

app.listen(port, ()=>{
    console.log("Server started at: " + port)
});
