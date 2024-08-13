const { Router } = require('express');
const midlewareUser = require("./users");
const midlewareNodemailer = require("./nodemail");

const router = Router();

//configurar rutas
router.use("/users", midlewareUser);
router.use("/mail", midlewareNodemailer);

module.exports = router;