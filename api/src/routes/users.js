const express = require('express');
const router = express.Router();
const userController = require("./controllers/User");

function isAuthenticated (req, res, next) {
    if (req.session.id) next()
    else next('route')
}

router.get("/", isAuthenticated, async (req, res) => {
    res.send('hello, ' + req.session.id + '!' +
    ' <a href="/logout">Logout</a>');
});

router.post("/", async (req, res) => {
    const { email, password, name } = req.body;
    try {
        const user = await userController.createUser(email, password, name);
        res.cookie('Usuario-Token', user.token, {
            expires: new Date(Date.now() + 86400000), // expira en 24 horas
            httpOnly: true,
            secure: true
        });
        req.session.id = user.id;
        res.status(201).json({ 
            msg: "¡Usuario Creado con exito!",
            name: user.name,
            id: user.id,
            email: user.email
        });
    } catch(error) {
        console.log(error);
        res.status(404).send({ msg: error.message });
    }
});

router.get("/data", isAuthenticated, async (req, res) => {
    const token = req.cookies["Usuario-Token"];
    try {
        if(token) {
            const user = await userController.getOneUser(token);
            return res.status(200).json(user);
        }
        throw new Error("Al parecer no podemos darte lo que necesitas :(")
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

router.post("/login", express.urlencoded({ extended: false }), async (req, res, next) => {
    const { email, name, password } = req.body;

    try {
        const user = await userController.login(email, name, password);
        req.session.id = user.id;
        // req.session.save(function (err) {
        //     if (err) return next(err);
        //     res.redirect('/');
        // });
        res.cookie('Usuario-Token', user.token, {
            expires: new Date(Date.now() + 3600000), // expira en 1 hora
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.status(201).json({
            msg: "Sesion Iniciada",
            id: user.id,
            name: user.name,
            email: user.email
        });
    } catch(error) {
        console.log(error)
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
    const token = req.cookies["Usuario-Token"];
    const { name, email } = req.body;
    const { id } = req.params;
    try{
        const response = await userController.updateUser(token, id, name, email);
        res.cookie('Usuario-Token', response.token, {
            expires: new Date(Date.now() + 3600000), // expira en 1 hora
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        res.status(201).send({ msg: response.msg });
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

module.exports = router;