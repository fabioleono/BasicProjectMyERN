require('dotenv').config() // trae las variables del archivo .env de la raiz
const app = require('./server/app')
const vhttps = require('vhttps')



if (process.env.CERT === "true") {
  const cred = require("./server/vhost/credentials");
  const httpsServer = vhttps.createServer(
    cred.default,
    [cred.wc1, cred.wc2, cred.wc3],
    app
  );

  httpsServer.listen(app.get("port"), () => {
    console.log("server on port: ", app.get("port"));
  });
} else {
  app.listen(app.get("port"), () => {
    console.log("server on port: ", app.get("port"));
  });
}










