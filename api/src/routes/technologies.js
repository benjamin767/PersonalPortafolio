const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("./Utils");

const { 
    createTech,
    getTech,
    updateTech,
} = require("./controllers/Technologies");

router.post("/", isAuthenticated, async (req, res) => {
    try {
        const { name, project } = req.body;
        const token = req.session.token;
        const tech = await createTech(name, project, token);
        res.status(201).json( tech );
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

router.get("/", isAuthenticated, async (req, res) => {
    try {
        const token = req.session.token;
        const { name } = req.query;
        const tech = await getTech(token,name);
        res.status(200).json(tech);
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

router.put("/", isAuthenticated, async (req, res) => {
    try {
        const { name, image, id } = req.body;
        const token = req.session.token;
        const tech = await updateTech(token, name, image, id);
        res.status(200).json(tech);
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

module.exports = router;