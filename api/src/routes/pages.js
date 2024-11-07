const express = require("express");
const router = express.Router();
const {
    getPrincipal,
 } = require("./controllers/Page")

router.get("/principal", async (req, res) => {
    try {
        res.status(200).json(await getPrincipal());
    } catch(error) {
        res.status(400).send({ msg: error.message });
    }
});

module.exports = router;