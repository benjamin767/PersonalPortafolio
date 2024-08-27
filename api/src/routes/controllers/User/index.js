const { User } = require("../../../db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
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
                name: user.name,
                email: user.email
            };
            let token = jwt.sign(payload, secret, { expiresIn: expires });
            return { token, id: user.id };
        });
    },
    getUsers: async () => {
        const users = await User.findAll();
        return users;
    },
    getOneUser: async (token) => {
        if(!token) throw new Error("Es necesario tener un token valido para manipular datos del servidor.");
        console.log(token)
        const data = jwt.verify(token, secret);

        let user = await User.findOne({
            where: {
                email: data.email
            }
        });
        if(!user) throw new Error("No existe el usuario");
        const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
        }
        return userData;
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
    login: async (email, name, password) => {
        if(!(email && password) && !(name && password)) new Error("Ups, user or password is not correct!");
        let response;
        if(email) {
            response = await User.findOne({
                where: {
                    email
                }
            }).then((res) => {
                if(!res) return res;
                const payload = {
                    id: res.id,
                    name: res.name,
                    email: res.email,
                };
                const isCorrect = bcrypt.compareSync(password, res.password);
                if(isCorrect){
                    let token = jwt.sign(payload, secret, { expiresIn: expires });
                    return { token, id: res.id };
                }
            });
        } else {
            response = await User.findOne({
                where: {
                    name
                }
            }).then((res) => {
                if(!res) return res;
                const payload = {
                    id: res.id,
                    name: res.name,
                    email: res.email,
                };
                const isCorrect = bcrypt.compareSync(password, res.password);
                if(isCorrect){
                    let token = jwt.sign(payload, secret, { expiresIn: expires });
                    return { token, id: res.id };
                }
            });
        }
        return response;
    },
};