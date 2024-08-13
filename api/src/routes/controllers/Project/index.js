const { Project } = require("../../../../src/db");

module.exports = {
    createProject: async (title, description, image) => {
        if(!title || !description || !image) throw new Error("Insufficient arguments");

        return await Project.create({
            title,
            description,
            image,
        });
    },
    getAllProjects: async () => {
        return await Project.findAll();
    },
    deleteProject: async (id) => {
        if(!id) throw new Error("Insufficient arguments");

        const isDelete = await Project.destroy({ 
            where: {
                id
            } 
        });

        if(isDelete < 1) return "There is no data with these arguments";
        return "Project deleted"
    }
}