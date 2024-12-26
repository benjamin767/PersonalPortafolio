const express = require("express");
const router = express.Router();
const { 
    createProject, 
    getAllProjects,
    deleteProject,
    modifyProject
} = require("./controllers/Project");
const { isAuthenticated } = require("./Utils");

router.post("/", isAuthenticated, async (req, res) => {
    const { title, description, image } = req.body;
    const token = req.session.token;

    try {
        const project = await createProject(title, description, image, token);
        res.status(201).json({ project });
    }catch(error) {
        console.log(error)
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

router.put("/:id", async (req, res) => {
    const token = req.session.token;
    const { id, title, description, image } = req.params;
    try {
        res.status(200).json({ msg: modifyProject(id, title, description, image, token) })
    } catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

router.delete("/", isAuthenticated, async (req, res) => {
    const { id } = req.body;
    const token = req.session.token;
    try {
        res.status(200).json({ msg: await deleteProject(id, token) });
    }catch(error) {
        res.status(404).send({ msg: error.message });
    }
});

module.exports = router;