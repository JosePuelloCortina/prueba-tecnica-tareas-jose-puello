const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Task', {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true,
            allowNull: false
        },
        titulo: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fechaDeComienzo: {
            type: DataTypes.DATE,
            allowNull: false
        },
        fechaDeCaducidad: {
            type: DataTypes.DATE,
            allowNull: false
        },
        prioridad: {
            type: DataTypes.ENUM(['alta', 'media', 'baja']),
            allowNull: false
        },
        progreso: {
            type: DataTypes.ENUM(['pendiente', 'enProceso', 'terminado']),
            allowNull: false
        }
    })
}