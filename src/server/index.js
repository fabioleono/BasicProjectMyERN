require('dotenv').config() // trae las variables del archivo .env de la raiz
const app = require('./server/app')
const appMobile = require("./server/appMobile");
const http = require("http");
const https = require("https");
const vhost = require("vhost");

console.log(app.get("credentials"));
let httpServer;

if(process.env.LOCAL==='true'){
  httpServer = app
}else{
  if(process.env.CERT==='true'){
    httpServer = https.createServer(app.get("credentials"), app);
  }else{
    httpServer = http.createServer(app);
  }
}

// httpServer.listen(app.get("port"), () => {
//   console.log("server on port: ", app.get("port"));
// });

httpServer
  .use(vhost("mobile.enabletech.tech", appMobile))
  .listen(app.get("port"), () => {
    console.log("server on port: ", app.get("port"));
  });
// var vhost = require("vhost");

// express()
//   .use(vhost("m.mysite.com", require("/path/to/m").app))
//   .use(vhost("sync.mysite.com", require("/path/to/sync").app))
//   .listen(80); 









