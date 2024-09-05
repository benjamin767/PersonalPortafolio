const { Project, User } = require("../../../db");
const jwt = require("jsonwebtoken");
const { secret } = process.env;

module.exports = {
    createProject: async (title, description, image, token) => {
        if(!title || !description || !image) throw new Error("Insufficient arguments");
        if(!token) throw new Error("Token invalido");

        const data = jwt.verify(token, secret);
        const { rol } = await User.findByPk(data.id);

        if(rol === "ADMIN"){
            return await Project.create({
                title,
                description,
                image,
            });
        }
        throw new Error("Me parece a mi que no tenes permisos querido, disculpame");
    },
    getAllProjects: async () => {
        return await Project.findAll();
    },
    modifyProject: async (id, title, description, image, token) => {
        if(!id || !token) throw new Error("Insufficient arguments");
        const data = jwt.verify(token, secret);
        const { rol } = await User.findByPk(data.id);

        if( rol === "ADMIN"){
            const response = await Project.updated({ title, description, image }, {
                where: {
                    id,
                }
            });
            if(!response[0]) throw new Error("Ups, no encontramos el proyecto señalado");
        }
        return "¡proyecto actualizado!"
    },
    deleteProject: async (id, token) => {
        if(!id || !token) throw new Error("Insufficient arguments");

        let isDelete;
        const data = jwt.verify(token, secret);
        const { rol } = await User.findByPk(data.id);

        if(rol === "ADMIN") {
            isDelete = await Project.destroy({ 
                where: {
                    id
                } 
            });
        }

        if(isDelete < 1) return "There is no data with these arguments";
        return "Project deleted"
    }
}