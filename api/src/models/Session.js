const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('session', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        expires: {
            type: DataTypes.DATE
        },
        data: {
            type: DataTypes.TEXT
        }
    });
}