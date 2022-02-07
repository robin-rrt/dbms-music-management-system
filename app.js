var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
const { body,validationResult } = require('express-validator');
const bodyParser = require('body-parser')
const mysql = require('mysql')
// const { ExpressOIDC } = require('@okta/oidc-middleware')
// var dashboardRouter = require('./routes/dashboard')

var indexRouter = require('./routes/index');
var searchRouter =require('./routes/search');
var usersRouter = require('./routes/users');
var genreSearchRouter = require('./routes/genreSearch');
var songSearchRouter = require('./routes/songSearch');
var artisteSearchRouter = require('./routes/artistSearch');


var app = express();

app.use(express.urlencoded({
  extended: true
}))

// const oidc = new ExpressOIDC({
//   issuer: `${process.env.ORG_URL}/oauth2/default`,
//   client_id: process.env.CLIENT_ID,
//   client_secret: process.env.CLIENT_SECRET,
//   redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
//   scope: 'openid profile',
//   })

// Set 'views' directory for any views 
// being rendered res.render()
// Set view engine as EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(session({
//   secret: process.env.APP_SECRET,
//   resave: true,
//   saveUninitialized: false,
//   }))

// app.use(oidc.router);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/search', searchRouter);
app.use('/genre-result', genreSearchRouter);
app.use('/song-result', songSearchRouter);
app.use('/artist-result', artisteSearchRouter);
// app.use('/dashboard', oidc.ensureAuthenticated(), dashboardRouter);

// app.get('/logout', (req, res) => {
//   req.logout()
//   res.redirect('/')
// })
//index page
// app.get('/', function(req, res) {
//   res.render('auth');
//   if(req.userContext){
//     res.render('auth', {title: 'MUZIKI Authentication',
//     userinfo: req.userinfo,})
//   }
//   else{
//     res.render('login', {title: 'Express'})
//   }
// });

//  about page
// app.get('/about', function(req, res) {
//   res.render('auth');
// });

// app.get('/dashboard', (req, res, next) => {
//   const descriptionList = Object.keys(req.userinfo).sort()
//     .map(key => ({
//       term: startCase(key),
//       details: (key === 'updated_at' ? new Date(req.userinfo[key] * 1000) : req.userinfo[key]),
//     }))

//   res.render('dashboard', {
//     title: 'Dashboard',
//     descriptionList,
//     userinfo,
//   })
// })


app.listen(8080);
console.log('Server is listening on port 8080');

//MYSQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'dbms'
})

app.get('/sql', (req, res) => {
  pool.getConnection((err, connection) => {
      if(err) throw err
      console.log('connected as id ' + connection.threadId)
      connection.query('SELECT * from artist', (err, rows) => {
          connection.release() // return the connection to pool

          if (!err) {
              res.send(rows)
          } else {
              console.log(err)
          }

          // if(err) throw err
          console.log('The Artists are: \n', rows)
      })
  })
})






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
