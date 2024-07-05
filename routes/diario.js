const express = require('express');
const router = express.Router();
const Diario = require('../models/Diario');
const Turma = require('../models/Turma');
const Curso = require('../models/Curso');
const Professor = require("../models/Professor");

router.get('/listar', function (req, res) {
    res.render('diario/listar', {layout: 'home'})
})

router.post('/listar', function (req, res) {
    Professor.findOne({
        where:{
            siape: req.body.siape,
        },
        include:{
            model: Diario,
            include:{
                model: Turma,
                include: Curso
            }
        }
    }).then(function (professor) {
        res.render('diario/listar', {professor: professor, diarios: professor.diarios, layout: 'home'})
    })
})

module.exports = router;