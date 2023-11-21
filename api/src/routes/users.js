const express = require('express');
const router = express.Router();
const userController = require("./controllers/User");

router.post("/", async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await userController.createUser(email, password, name);
        res.status(201).json(user);
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

router.get("/login", async (req, res) => {
    const { email, name, password } = req.query;
    try {
        const user = await userController.login(email, name, password);
        res.status(200).json(user);
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