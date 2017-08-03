const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const session = require('express-session');
const users = require('./users.js')
const fs = require('fs');
const app = express();


// use handlbars
app.engine('handlebars', exphbs());
app.set('views', './views');
app.set('view engine', 'handlebars');

// configure session middleware
app.use(
  session({
    secret: 'V4P3N4710N',
    resave: false,
    saveUninitialized: true
  })
)

// setup morgan to log requests
app.use(morgan('dev'));

// tell express how to serve static files
app.use(express.static('public'));

// use body parser to parse form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// use express validator
app.use(expressValidator());

// create default session
app.use((req, res, next) => {

  if (!req.session.users) {

    req.session.users = [];

  }
  console.log(req.session);

  next();
});


app.get('/', (req, res) => {
  if (req.session.users === undefined || req.session.users.length == 0){
    res.redirect('/login');
  } else {
    let users = req.session;
    console.log(users);
    res.render('home', {
      users: users
    })
  }


})

app.get('/login', (req, res) =>{

  res.render('login')
})

app.post('/login', (req, res) =>{
  let userInfo = req.body;

  req.checkBody('email', 'Email is Required').notEmpty();

  req.checkBody('password', 'Password is Required').notEmpty();

  let errors = req.validationErrors();

  if  (errors) {
    console.log(errors);

    res.render('login', {
      errors: errors,
      userInfo: userInfo

    })

  } else {

    req.session.users.push(userInfo);
    users.push(userInfo);
    console.log(users);


    res.redirect('/');
  }
})

// listen on port 3000
app.listen(3000);
