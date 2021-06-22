const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('morgan');
const app = express();

//Aquí llamo a mi modelo usuario - User
const {User} = require('./database/models');

//Implementando express-session
app.use(session({
  secret: 'movies',
  resave: false,
  saveUninitialized: true
}))


//Activar el uso de las cookies

//----------------    El detalle final del  ¿ Por Que ? no cargaba la aplicación, eraque al llamar el cookieParser ** ----- No le coloque el parentesis ----- **
// Lo habia colocado así: app.use(cookieParser)
// Y debí colocarlo así:   app.use(cookieParser());
//Ya que es un método.


//-------------------------------
app.use(cookieParser());
//-------------------------------
//Debo crear una función - Middleware - Si el usuario coloco recordarme en la vista del login
app.use(function(req,res,next){
  console.log(req.cookies.userId+'------------------------------');
  
  if(req.session.user === undefined && req.cookies.userId != undefined){
    User.findByPk(req.cookies.userId)
    .then(usuario =>{
      //console.log(usuario+'------------------------------');
      req.session.user = usuario
     next()
    })
  }else{
    next()
  }
})

//Debo crear una función - Middleware
app.use(function(req,res,next){
  //console.log(req.session.user+'--------------------');
  if(req.session.user != undefined){
    res.locals.user = req.session.user;
    //console.log(res.locals.user.name+'------------------------------');
  }
  next();
})


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/movies',moviesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
