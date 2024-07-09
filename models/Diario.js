const banco = require('./banco')
const Turma = require('./Turma')
const Professor = require('./Professor')

const Diario = banco.sequelize.define('diarios', {
    codigo:{
        type: banco.Sequelize.INTEGER,
    },
    descricao: {
        type: banco.Sequelize.STRING,
    },
    link:{
        type: banco.Sequelize.STRING,
    },
    status: {
        type: banco.Sequelize.INTEGER,
    },
})

Diario.belongsTo(Professor, {
    foreignKey: 'professor_id',
    constraint: true,
})

Diario.belongsTo(Turma, {
    foreignKey: 'turma_id',
    constraint: true,
})

Turma.hasMany(Diario,{
    foreignKey: 'turma_id',
})

Professor.hasMany(Diario,{
    foreignKey: 'professor_id',
})

//Diario.sync()
module.exports = Diario