const express = require('express');
const router = express.Router();
const Diario = require('../models/Diario');
const Professor = require('../models/Professor');
const Curso = require('../models/Curso');
const {coordenador} = require('../helpers/acl');

const Solicitacao = require('../models/Solicitacao');
const Turma = require("../models/Turma");

router.get('/', coordenador, function (req, res) {
    res.render('principal/index')
})

module.exports = router