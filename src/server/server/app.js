const express = require("express");
const morgan = require('morgan')
const path = require('path')
//const passport = require('passport')
//const session = require('express-session')
//const favicon = require('serve-favicon')
//const creatError = require('http-errors')

 const fs = require("fs");
// const http = require("http");
// const https = require("https");
//let httpServer
// Initializations
const app = express()
// requiero el archivo de configuracion de Passport y su estrategia
//require('../Passport/local-auth');

// Settings 
if(process.env.LOCAL==='true') {
  app.set("port", process.env.PORT_LOCAL || 5000);
  app.set("credentials", {})
}else{

  if(process.env.CERT==='true') {
        
    const privateKey = fs.readFileSync(
      "/etc/letsencrypt/live/enabletech.tech/privkey.pem",
      "utf8"
    );
    const certificate = fs.readFileSync(
      "/etc/letsencrypt/live/enabletech.tech/cert.pem",
      "utf8"
    );
    const ca = fs.readFileSync(
      "/etc/letsencrypt/live/enabletech.tech/chain.pem",
      "utf8"
    );

    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };
    app.set("port", process.env.PORT_REMOTE_HTTPS || 5001);
    app.set("credentials", credentials);
  }else{
    app.set("port", process.env.PORT_REMOTE || 5002);
    app.set("credentials", {});
  }
  
}

//middlewares
//app.use(favicon(path.join(__dirname, "../", "public/images/favicon.png")));
app.use(morgan('dev')) // ver el tipo de peticion y el tiempo de respuesta
app.use(express.json()) // recibo las solicitudes json de los clientes
app.use(express.urlencoded({extended:false})) // recibir datos de formularios y lo conviert en objetos de javascript
// uso el middleware de passport pero primero configuro los datos del modulo de session
// app.use(session({
//   secret: process.env.KEY_SESSION,
//   resave: false,// en TRUE por cada peticion si la sesion no fue modifica igual se guarda la sesion
//   saveUninitialized: false // en TRUE, Si se inicializa una sesion en una peticion y no se guarda nada igual se guarda
// }))
// app.use(passport.initialize())
// app.use(passport.session())



// static Files, carpeta public
//console.log(path.join(__dirname, "../../../", "public")); // a la carpeta public

// en la carpeta bundle se genera el codigo que se convierte del  FRONTEND con yarn build 
app.use(express.static(path.join(__dirname, "../../../", "build"))); // Ej. localhost:3000/index.html
//app.use(express.static(path.join(__dirname, "../../../", "public"))); // Ej. localhost:3000/index.html

//app.use('public', express.static(path.join(__dirname, "../", "public"))); // aca en el browser los archivos publicos seran disponibles desde localhost:3000/public/index.html

// Routes
//require("../routes/index")(app); // si se envia una funcion desde el archivo index.js de routes, con parametro app. Modelo B
app.use(require('../routes/index')) // accedo a las rutas del archivo index.js
//app.use(require('../routes/authentication')) // accedo a las rutas del archivo autentication.js
//app.use('/Links', require('../routes/links')) // acceso a las rutas del archivo links.js, PERO en el dominio le van a preceder la ruta localhost:3000/Links

//app.use(require('../routes/error')) // se puede generar una ruta para las rutas que no existan en la carpeta routes, y de esa ruta llamar un controller con la visualizacion del error. O si se prefiere se genera un middleware para generar un error y despues especificar en el una respuesta en un archivo estatico html 

// Global Variables
// defino en un middleware la respuesta a una ruta no existente dentro de mis rutas
// creo el error como respuesta 

// app.use((req,res,next) => {
//   next(creatError(404))
// })
// el error creado anteriormente se ejecutara en el siguiente middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)

    .sendFile(path.join(__dirname, "../../../", "public/error.html"));
    console.log('ERROR HTTP ', err.stack);
    
})



// app.use((req, res, next) => {
//   app.locals.messageError = 'ACA va un local';
//   next()
// })

module.exports = app


