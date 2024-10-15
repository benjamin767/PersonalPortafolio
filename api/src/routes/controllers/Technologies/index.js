const { Technologie, User } = require("../../../db");
const jwt = require("jsonwebtoken");
const { secret } = process.env;

module.exports = {
    createTech: async (name, token) => {
        if(!token || !name) throw new Error("Faltan argumentos para realizar esta accion.");
        const data = jwt.verify(token, secret);
        const { rol } = await User.findByPk(data.id);
        if(rol === "ADMIN") {
            return await Technologie.create({ name });
        }
        
    },
    getTech: async (name) => {
        if(name) return await Technologie.findByPk(name);
        return await Technologie.findAll();
    },
    updateTech: async (token, name, image, id) => {
        if(!token) throw new Error("No tenes autorizaciones papi, aca no pasas");
        const data = jwt.verify(token, secret);
        const { rol } = await User.findByPk(data.id);
        if(rol === "ADMIN") {
            return await Technologie.update({ 
                name,
                image 
            }, {
                where: { 
                    name:  id,
                }
            });
        }
    },
};