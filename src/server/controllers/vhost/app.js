const ctrl = {}; // creo el objeto controlador

// creo las funciones para ese controlador

ctrl.root = (req, res, next) => {
  //res.send('it works')
  res.status(200).json({ WildcartApp: "ok" });
  console.log("respuesta desde / ", req.url);
  console.log("vhost ", req.vhost);

  // res.json({ conexion: "ok" });
  // console.log('ruta a la raiz ', req.url);
  // console.log('headers raiz ', req.headers.host);
};

module.exports = ctrl;
