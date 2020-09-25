const express = require("express");
const morgan = require("morgan");
// const path = require("path");

// Initializations
const app = express();


//middlewares

app.use(morgan("dev")); // ver el tipo de peticion y el tiempo de respuesta
app.use(express.json()); // recibo las solicitudes json de los clientes
app.use(express.urlencoded({ extended: false })); // recibir datos de formularios y lo conviert en objetos de 
//app.use(express.static(path.join(__dirname, "../../../", "build"))); // Ej. localhost:3000/index.html
//app.use(express.static(path.join(__dirname, "../../../", "public"))); // Ej. localhost:3000/index.html

app.use(require("../../routes/vhost/mobile")); // accedo a las rutas del archivo index.js


module.exports = app;
