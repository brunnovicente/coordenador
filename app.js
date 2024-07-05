//MÓDULOS
const express = require('express');
const app = express();
const handlebars = require('express-handlebars')
const router = express.Router();
const bodyParser = require('body-parser');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require('path')
const moment = require('moment')
const momentTimezone = require('moment-timezone')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
require('./config/auth')(passport)

//ROTAS EXTERNAS

//CONFIGURAÇÕES

app.use(session({
    secret: 'iambatman',
    resave: true,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session())
app.use(flash())
//Middleware
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.user = req.user || null
    next()
})

//Handlbars - Teamplate
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    'helpers': {
        formatDate: function (date) {
            return momentTimezone(date).tz('America/Sao_Paulo').format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars');

//Body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Public
app.use(express.static(path.join(__dirname, 'public')))

//ROTA PRINCIPAL
app.get('/', (req, res) => {
    res.redirect('/diario/listar')
})

const solicitacao = require('./routes/solicitacao');
app.use('/solicitacao', solicitacao);

const user = require('./routes/user');
app.use('/user', user);

const professor = require('./routes/professor');
app.use('/professor', professor);

const diario = require('./routes/diario');
app.use('/diario', diario);

const principal = require('./routes/principal');
app.use('/principal', principal);

//const User = require('./models/user');
//const Professor = require('./models/professor');
//const Curso = require('./models/curso');
//const Turma = require('./models/turma');
//const Diario = require('./models/diario');

PORTA = 8081
app.listen(PORTA, function (){
    console.log('Servidor rodando: http://localhost:'+PORTA);
})