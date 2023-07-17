const { User } = require("../../../db");
const jwt = require("jsonwebtoken");
const { secret, expires } = process.env;

module.exports = {
    createUser: async (email, password, name) => {
        if(!email || !password || !name) throw new Error("Faltan argumentos para crear una cuenta.");
        return await User.create({
            email, 
            password, 
            name 
        }).then(user => {
            const payload = {
                id: user.id,
                name: user.name
            };
            let token = jwt.sign(payload, secret, { expiresIn: expires });
            return { token, name: user.name };
        });
    },
    getUsers: async () => {
        const users = await User.findAll();
        return users;
    },
    getOneUser: async (email) => {
        if(!email) throw new Error("Falta pasar email");
        let user = await User.findOne({
            where: {
                email
            }
        });
        if(!user) throw new Error("No existe el usuario");
        user = {
            id: user.id,
            name: user.name,
            email: user.name,
        }
        return user;
    },
    deleteUser: async (id) => {
        if(!id) throw new Error("faltan args para eliminar un usuario.");
        const response = await User.destroy({
            where: { id }
        });
        if(!response) throw new Error("Ups, No conocemos este usuario.");
        return "Usuario eliminado.";
    },
    updateUser: async (auth, name, password) => {
        if(!auth || !auth.toLowerCase().startsWith("bearer")) throw new Error("No estas autorizado para realizar esta acción");
        if(!name || !password) throw new Error("Faltan datos para actualizar usuario.");
        const token = auth.split(" ")[1];
        const data = jwt.verify(token, secret);
        const response = await User.update({
            name,
            password
        },{
            where: { id: data.id },
            individualHooks: true,
        });
        
        if(!response[0]) throw new Error("Ups, No conocemos este usuario");
        return  "Usuario actualizado.";
    },
};