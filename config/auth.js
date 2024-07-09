const localStrategy = require('passport-local').Strategy
const criptografia = require('bcryptjs')
const User = require('../models/User')
const Professor = require('../models/Professor')
const {where} = require("sequelize");


module.exports = function (passport){
    passport.use(new localStrategy({usernameField: 'username', passwordField: 'password'}, function (username, password, done){
        User.findOne({
            where:{username: username},
            include: Professor
        }).then((user)=>{
            if(!user){
                return done(null, false, {message: 'Usuário não encontrado'});
            }
            criptografia.compare(password, user.password, function(err, iguais){
                if(iguais){
                    return done(null, user)
                }else{
                    return done(null, false, {message: 'Senha incorreta'})
                }
            })
        })
    }))

    passport.serializeUser(function (user, done){
        done(null, user.id)
    })

    passport.deserializeUser(function (id, done){
        User.findByPk(id).then((user) => {
            done(null, user)
        })
    })

}