const banco = require('./banco')
const Curso = require('./Curso')

const Turma = banco.sequelize.define('turmas', {
    nome:{
        type: banco.Sequelize.STRING
    },
    descricao: {
        type: banco.Sequelize.STRING,
    },
    ano: {
        type: banco.Sequelize.INTEGER,
    },
    status:{
        type: banco.Sequelize.INTEGER,
    }
})

Turma.belongsTo(Curso, {
    foreignKey: 'curso_id',
    constraint: true,
})

Curso.hasMany(Turma, {
    foreignKey: 'curso_id'
})

//Turma.sync()
module.exports = Turma