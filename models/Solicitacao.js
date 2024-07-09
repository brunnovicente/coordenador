const banco = require('./banco')
const Diario = require('./Diario')

const Solicitacao = banco.sequelize.define('solicitacoes', {
    data:{
        type: banco.Sequelize.DATE
    },
    dia: {
        type: banco.Sequelize.STRING,
    },
    horarios: {
        type: banco.Sequelize.STRING,
    },
    justificativa:{
        type: banco.Sequelize.STRING,
    },
    tipo:{
        type: banco.Sequelize.STRING,
    },
    status:{
        type: banco.Sequelize.INTEGER,
    },
    registro:{
        type: banco.Sequelize.INTEGER,
    },
    solicitante:{
        type: banco.Sequelize.STRING,
    }
})

Solicitacao.belongsTo(Diario, {
    foreignKey: 'diario_id',
    constraint: true,
})

//Solicitacao.sync()
module.exports = Solicitacao