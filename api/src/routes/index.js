const { Router } = require('express');
const midlewareUser = require("./users");

const router = Router();

//configurar rutas
router.use("/users", midlewareUser);

module.exports = router;