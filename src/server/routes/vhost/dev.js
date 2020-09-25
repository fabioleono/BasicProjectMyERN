const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/vhost/dev");

router.get("*", ctrl.root); // Con REACT, a la raiz se llega por medio del staticFiles del server

module.exports = router;
