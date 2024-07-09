const banco = require('./banco')
const User = require('./User')

const Professor = banco.sequelize.define('professores', {
    siape: {
        type: banco.Sequelize.INTEGER,
    },
    nome: {
        type: banco.Sequelize.STRING,
    },
    email: {
        type: banco.Sequelize.STRING,
    },
})

Professor.belongsTo(User, {
    foreignKey: 'user_id',
    constraint: true,
    as: 'professor'
})

User.hasOne(Professor, {
    foreignKey: 'user_id',
})

//Professor.sync()
module.exports = Professor