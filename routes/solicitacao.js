const express = require('express');
const router = express.Router();
const Diario = require('../models/Diario');
const Professor = require('../models/Professor');
const Curso = require('../models/Curso');

const Solicitacao = require('../models/Solicitacao');
const Turma = require("../models/Turma");

router.get('/listar/:id', (req, res) => {
    Professor.findOne({
        where:{
            id: req.params.id,
        }
    }).then(function (professor) {
        Solicitacao.findAll({
            include:{
                model: Diario,
                include: {
                    model: Professor
                },
                where:{
                    professor_id: professor.id
                }
            },
            order: [['data', 'DESC']]
        }).then(function (solicitacoes) {
            res.render('solicitacao/listar', {solicitacoes: solicitacoes, professor: professor, layout: 'home'});
        })
    })

})

router.get('/view', function (req, res) {
    res.render('solicitacao/view')
})

router.get('/solicitar/:id', function (req, res) {
    Diario.findOne({
        include:[
            {
                model: Turma,
                include: Curso
            },
            {
                model: Professor,
            }
        ],
        where:{
            id: req.params.id
        },

    }).then(function (diario) {
        res.render('solicitacao/solicitar', {diario: diario, layout: 'home'})
    })

})

router.post('/solicitar/:id', function (req, res) {
    Diario.findOne({
        include:[
            {
                model: Turma,
                include: Curso
            },
            {
                model: Professor,
            }
        ],
        where:{
            id: req.params.id
        },

    }).then(function (diario) {
        var horarios = ''
        if(!(req.body.primeiro == undefined)){
            horarios += '1º '
        }
        if(!(req.body.segundo == undefined)){
            horarios += '2º '
        }
        if(!(req.body.terceiro == undefined)){
            horarios += '3º '
        }
        if(!(req.body.quarto == undefined)){
            horarios += '4º '
        }
        if(!(req.body.quinto == undefined)){
            horarios += '5º '
        }
        if(!(req.body.sexto == undefined)){
            horarios += '6º '
        }

        //Calculando o dia da semana
        var diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        var data = new Date(req.body.data)
        var dia = diasDaSemana[data.getDay()+1]

        var solicitacao = {
            data: data,
            horarios: horarios,
            justificativa: req.body.justificativa,
            tipo: req.body.tipo,
            status: 0,
            solicitante: diario.professore.nome,
            diario_id: diario.id,
            dia: dia,
        }
        Solicitacao.create(solicitacao).then(function () {
            req.flash('success_msg', 'Solicitação realizada com sucesso')
            res.redirect('/solicitacao/listar/'+diario.professore.id)
        }).catch(function (error) {
            req.flash('success_msg', 'Solicitação realizada com sucesso')
            res.redirect('/diario/listar', {siape: diario.professore.siape})
        });
    })
})

module.exports = router;