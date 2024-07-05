const express = require('express');
const router = express.Router();
const Professor = require('../models/Professor');
const User = require('../models/User');
const {coordenador} = require('../helpers/acl');

router.get('/', coordenador, function (req, res) {
    Professor.findAll({include: User}).then(function (professores) {
        res.render('professor/index', {professores: professores})
    }).catch(function (error) {
        console.log('ERRO: '+error);
    })
});

module.exports = router;