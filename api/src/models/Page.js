const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('page', {
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: "principal"
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Falta el nombre, lindo"
                }
            }
        },
        surname: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        github: {
            type: DataTypes.STRING,
        },
        linkedin: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                msg: "El email ya esta registrado."
            },
            validate: {
                isEmail: {
                    msg: "email no valido.",
                },
                notEmpty: {
                    msg: "Ingrese un email."
                },
            },
        }
    });
};