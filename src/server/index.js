require('dotenv').config() // trae las variables del archivo .env de la raiz
const app = require('./server/app')
const fs = require("fs");
const http = require("http");
const https = require("https");


if(process.env.LOCAL){

  async function init() {
    await app.listen(app.get("port"));
    console.log("server on port: ", app.get("port"));
  }
  init();
  

}else{
  let httpServer
  // AWS SERVER, Certificate CertBot
  if (process.env.CERT) {
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

    httpServer = https.createServer(credentials, app);
  } else {
    httpServer = http.createServer(app);
  }

  // Starting both http & https servers
  httpServer.listen(app.get("port"), () => {
    console.log("server on port: ", app.get("port"));
  });
}









