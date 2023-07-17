const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    sequelize.define('user', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [7, 255],
                    msg: "La contraseña debe tener minimamente 7 caracteres."
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: {
                    msg: "El nombre solo debe contener letras."
                },
                len: {
                    args: [2, 255],
                    msg: "El nombre debe tener minimamente dos letras."
                }
            },
        }
    }, {
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, "a");
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            },
            beforeUpdate: async (user) => {
                if (user.password) {
                    const salt = await bcrypt.genSaltSync(10, "a");
                    user.password = bcrypt.hashSync(user.password, salt);
                }
            }
        }
    }, {
        timestamps: false,
    });
};