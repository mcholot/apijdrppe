const Sequelize = require('sequelize');

const RarityItemSchema = {
    // Model attributes are defined here
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
};

module.exports = { RarityItemSchema };