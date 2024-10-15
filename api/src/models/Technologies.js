const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('technologie', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        image: {
            type: DataTypes.STRING,
        },
    });
}