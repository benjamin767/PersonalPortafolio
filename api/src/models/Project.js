const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('project', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Benja, ingresá un nombre!"
                }
            }
        },
        image: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        }
    });
};