const express = require("express");
const path = require('path')
const morgan = require('morgan');
const vhost = require("vhost");
const vhMobile = require("./vhost/mobile");
const vhApp = require('./vhost/app')
const vhDev = require('./vhost/dev')

const app = express()
let domain
if (process.env.LOCAL === "true") {
  app.set("port", process.env.PORT_LOCAL || 5000);
  domain = 'localhost'
} else {
  domain = process.env.DOMAIN;
  if (process.env.CERT === "true") {
    app.set("port", process.env.PORT_REMOTE_HTTPS || 5001);
  } else {
    app.set("port", process.env.PORT_REMOTE || 5002);
  }
}

//middlewares
app.use(vhost(`mobile.${domain}`, vhMobile));
app.use(vhost(`app.${domain}`, vhApp));
app.use(vhost(`dev.${domain}`, vhDev));

//app.use(favicon(path.join(__dirname, "../", "public/images/favicon.png")));
app.use(morgan('dev')) // ver el tipo de peticion y el tiempo de respuesta
app.use(express.json()) // recibo las solicitudes json de los clientes
app.use(express.urlencoded({extended:false})) // recibir datos de formularios y lo conviert en objetos de javascript


// static Files, carpeta public
// en la carpeta bundle se genera el codigo que se convierte del  FRONTEND con yarn build 
app.use(express.static(path.join(__dirname, "../../../", "build"))); // Ej. localhost:3000/index.html
//app.use(express.static(path.join(__dirname, "../../../", "public"))); // Ej. localhost:3000/index.html

//app.use('public', express.static(path.join(__dirname, "../", "public"))); // aca en el browser los archivos publicos seran disponibles desde localhost:3000/public/index.html

// Routes
//app.use(require("../routes/vhost/index"));

//require("../routes/index")(app); // si se envia una funcion desde el archivo index.js de routes, con parametro app. Modelo B
app.use(require('../routes/index')) // accedo a las rutas del archivo index.js
//app.use(require('../routes/authentication')) // accedo a las rutas del archivo autentication.js
//app.use('/Links', require('../routes/links')) // acceso a las rutas del archivo links.js, PERO en el dominio le van a preceder la ruta localhost:3000/Links
//app.use(require('../routes/vhost/index'))


module.exports = app


