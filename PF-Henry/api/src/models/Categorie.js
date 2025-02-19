const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('categorie', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
        {
            timestamps: false
        }
    );
};