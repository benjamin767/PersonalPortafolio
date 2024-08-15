const express = require('express');
const router = express.Router();
const userController = require("./controllers/User");

router.post("/", async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await userController.createUser(email, password, name);
        res.status(201).cookie('Usuario-Token', user, {
            expires: new Date(Date.now() + 3600000), // expira en 1 hora
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.status(201).send("¡Usuario Creado con exito!")
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

router.get("/", async (req, res) => {
    const { email } = req.query;
    try {
        if(email) {
            const user = await userController.getOneUser(email);
            return res.status(200).json(user);
        }
        const users = await userController.getUsers();
        res.status(200).json(users);
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, name, password } = req.body;
    try {
        const user = await userController.login(email, name, password);
        res.status(200).cookie('Usuario-Token', user, {
            expires: new Date(Date.now() + 3600000), // expira en 1 hora
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.send("Sesion Iniciada");
    } catch(error) {
        res.status(404).send( { msg: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        res.send({ msg: await userController.deleteUser(id) });
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

router.put("/:id", async (req, res) => {
    const { authorization } = req.headers;
    const { name, password } = req.body;
    try{
        const response = await userController.updateUser(authorization, name, password);
        res.status(201).send({ msg: response });
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});
module.exports = router;