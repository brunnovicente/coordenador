module.exports = {
    'coordenador': function(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg', 'Você não tem permissão para acessa essa página')
        res.redirect('/')
    }
}