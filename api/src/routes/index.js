const { Router } = require('express');
const midlewareUser = require("./users");
const midlewareNodemailer = require("./nodemail");
const midlewareProject = require("./project");

const router = Router();

//configurar rutas
router.use("/users", midlewareUser);
router.use("/mail", midlewareNodemailer);
router.use("/project", midlewareProject);

module.exports = router;