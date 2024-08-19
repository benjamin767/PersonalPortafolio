const express = require('express');
const router = express.Router();
const userController = require("./controllers/User");

function isAuthenticated (req, res, next) {
    if (req.session.token) next()
    else next('route')
}

router.get("/", isAuthenticated, async (req, res) => {
    res.send('hello, ' + req.session.token + '!' +
    ' <a href="/logout">Logout</a>');
});

router.post("/", async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await userController.createUser(email, password, name);
        res.cookie('Usuario-Token', user, {
            expires: new Date(Date.now() + 86400000), // expira en 24 hora
            httpOnly: true,
            secure: true
        });
        req.session.token = user.token;
        res.status(201).send("¡Usuario Creado con exito!");
    } catch(error) {
        console.log(error);
        res.status(404).send({ msg: error.message });
    }
});

router.get("/data", isAuthenticated, async (req, res) => {
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

router.post("/login", express.urlencoded({ extended: false }), async (req, res, next) => {
    const { email, name, password } = req.body;
    try {
        const user = await userController.login(email, name, password);
        req.session.token = user.token;
        // req.session.save(function (err) {
        //     if (err) return next(err);
        //     res.redirect('/');
        // });
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

router.post('/logout', isAuthenticated, (req, res) => {
    // Eliminar el token JWT del cliente
    res.clearCookie('Usuario-Token');
    // Invalidar la sesión en el servidor
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(400).send(error.message)
        }else {
        // Eliminar el token JWT del servidor
            res.status(200).send('Logout exitoso');
        }
    });
});

router.delete("/:id", isAuthenticated, async (req, res) => {
    const { id } = req.params;
    try {
        res.send({ msg: await userController.deleteUser(id) });
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

router.put("/:id", isAuthenticated, async (req, res) => {
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