const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('project', {
        title: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Benja, ingresá un titulo!"
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