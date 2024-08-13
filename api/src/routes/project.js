const express = require("express");
const router = express.Router();
const { 
    createProject, 
    getAllProjects,
    deleteProject
} = require("./controllers/Project");

router.post("/", async (req, res) => {
    const { title, description, img } = req.body;

    try {
        const project = await createProject(title, description, img);
        res.status(201).json({ project });
    }catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const projects = await getAllProjects();
        res.status(200).json({ projects });
    }catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

router.delete("/", async (req, res) => {
    const { id } = req.body;

    try {
        res.status(200).json({ msg: await deleteProject(id) });
    }catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

module.exports = router;