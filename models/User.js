const banco = require('./banco')

const User = banco.sequelize.define('users', {
    username: {
        type: banco.Sequelize.STRING,
    },
    password: {
        type: banco.Sequelize.STRING,
    },
    categoria: {
        type: banco.Sequelize.INTEGER,
    },
    status: {
        type: banco.Sequelize.INTEGER,
    },
    foto:{
        type: banco.Sequelize.TEXT,
    }
})

User.sync()
module.exports = User