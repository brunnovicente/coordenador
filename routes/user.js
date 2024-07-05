const express = require('express');
const router = express.Router();
const User = require('../models/user');
const criptografia = require('bcryptjs');
const passport = require('passport');
const {coordenador} = require('../helpers/acl');

router.get('/', (req, res) => {
    res.send('Users page loaded!');
})

router.get('/cadastro', coordenador,(req, res) => {
    res.render('user/cadastro');
})

router.post('/cadastro', coordenador, function (req, res) {
    var senha = req.body.password;
    criptografia.genSalt(10, function (err, salt) {
        criptografia.hash(senha, salt, function (err, hash) {
            if (err) {
                req.flash('error_msg', 'Erro na Criptografia da senha');
                res.redirect('/')
            }

            User.create({
                username: req.body.username,
                password: hash,
                categoria: 0,
                status: 1
            }).then((user) => {
                req.flash('sucess_msg', 'Usuário cadastrado com sucesso')
                res.redirect('/principal/index')
            })

        });
    })


})

router.get('/login', function (req, res) {
    res.render('user/login',{layout: 'home'})
})
router.post('/login',  function (req, res, next) {
    passport.authenticate('local',{
        successRedirect: '/principal',
        failureRedirect: '/user/login',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', function (req, res) {
    req.logout(function (err) {
        req.flash('success_msg', 'Usuário deslogado')
        res.redirect('/')
    })
})

module.exports = router;