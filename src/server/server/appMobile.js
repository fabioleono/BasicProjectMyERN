const express = require("express");
const morgan = require("morgan");
const path = require("path");


const fs = require("fs");

// Initializations
const app = express();

// Settings
if (process.env.LOCAL === "true") {
  app.set("port", process.env.PORT_LOCAL || 5000);
  app.set("credentials", {});
} else {
  if (process.env.CERT === "true") {
    const privateKey = fs.readFileSync(
      "/etc/letsencrypt/live/mobile.enabletech.tech/privkey.pem",
      "utf8"
    );
    const certificate = fs.readFileSync(
      "/etc/letsencrypt/live/mobile.enabletech.tech/cert.pem",
      "utf8"
    );
    const ca = fs.readFileSync(
      "/etc/letsencrypt/live/mobile.enabletech.tech/chain.pem",
      "utf8"
    );

    const credentials = {
      key: privateKey,
      cert: certificate,
      ca: ca,
    };
    app.set("port", process.env.PORT_REMOTE_HTTPS || 5001);
    app.set("credentials", credentials);
  } else {
    app.set("port", process.env.PORT_REMOTE || 5002);
    app.set("credentials", {});
  }
}

//middlewares

app.use(morgan("dev")); // ver el tipo de peticion y el tiempo de respuesta
app.use(express.json()); // recibo las solicitudes json de los clientes
app.use(express.urlencoded({ extended: false })); // recibir datos de formularios y lo conviert en objetos de 
app.use(express.static(path.join(__dirname, "../../../", "build"))); // Ej. localhost:3000/index.html
//app.use(express.static(path.join(__dirname, "../../../", "public"))); // Ej. localhost:3000/index.html

app.use(require("../routes/vhost/index")); // accedo a las rutas del archivo index.js


module.exports = app;
