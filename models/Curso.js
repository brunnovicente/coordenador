const banco = require('./banco')
const Professor = require('./Professor')

const Curso = banco.sequelize.define('cursos', {
    descricao: {
        type: banco.Sequelize.STRING,
    },
    sigla: {
        type: banco.Sequelize.STRING,
    },
})

Curso.belongsTo(Professor, {
    foreignKey: 'professor_id',
    constraint: true,
})

Curso.sync()
module.exports = Curso