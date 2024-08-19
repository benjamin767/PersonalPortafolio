const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('session', {
        sid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        userId:{ 
            type: DataTypes.STRING
        },
        expires: {
            type: DataTypes.DATE
        },
        data: {
            type: DataTypes.TEXT
        },
    });
}