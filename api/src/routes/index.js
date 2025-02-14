const { Router } = require('express');
const midlewareUser = require("./users");
const midlewareNodemailer = require("./nodemail");
const midlewareProject = require("./project");
const midlewareTechnologie = require("./technologies");
const midlewarePage  = require("./pages");
const midlewareAWS  = require("./aws");


const router = Router();

//configurar rutas
router.use("/users", midlewareUser);
router.use("/mail", midlewareNodemailer);
router.use("/project", midlewareProject);
router.use("/technologies", midlewareTechnologie);
router.use("/pages", midlewarePage)
router.use("/aws", midlewareAWS);

module.exports = router;