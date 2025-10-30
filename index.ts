import axios = require("axios");
import express = require("express");
import cors = require("cors");
import os = require("os");

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
    res.status(500).json("Internal server error")
    }
});

app.post("/api/books", (req, res)=>{
    const Title = req.body.title;
    const Author = req.body.author;
    const Pages = req.body.pages;


    if(typeof(Title) !== "string" || typeof(Author) !== "string" || typeof(Pages) !== "number"){
        res.status(400).json("Bad request: Faltan campos obligatorios o no son del tipo correcto");
        return;
    }
    try{
    const nuevoLibro:libro = {
        id: Number(Date.now()),
        title: Title,
        author: Author,
        pages: Pages,
    }
      libros.push(nuevoLibro);
      res.status(201).json(nuevoLibro);
    }catch(error){
    res.status(500).json("Internal server error")
    }
    
    
});

app.put("/api/books/:id", (req,res)=>{
    
    const id = Number(req.params.id);
    const Title = req.body.title;
    const Author = req.body.author;
    const Pages = req.body.pages;

    if(!id){
        res.status(400).json("Bad request: Falta indicar id");
        return;
    }
    if(!libros.find(l => l.id === id)){
        res.status(404).json("Not found");
        return;
     }
     if(typeof(Title) !== "string" || typeof(Author) !== "string" || typeof(Pages) !== "number"){
        res.status(400).json("Bad request: Faltan campos obligatorios o no son del tipo correcto");
        return;
    }

   try{
    const libroActualizado:libro = {
        id: id,
        title: Title,
        author: Author,
        pages: Pages,
    }
   
    libros = libros.map((libro) =>{
        libro.id === id
        return libro = libroActualizado;
    } );
    res.status(200).json(libros.find(l => l.id === id));
    }catch(error){
    res.status(500).json("Internal server error")
    }


})

app.delete("/api/books/:id", (req, res) =>{
     const id = Number(req.params.id);
     if(!libros.find(l => l.id === id)){
        res.status(404).json("Not found");
        return;
     }
     try{
     const librosSinLibroAEliminar = libros.filter((libro)=> libro.id !== id);
     
        libros = librosSinLibroAEliminar;
        res.status(201).json(librosSinLibroAEliminar);
    }catch(error){
    res.status(500).json("Internal server error")
    }

    });


app.listen(port, ()=>{
    console.log("Server started at: " + port)
});
