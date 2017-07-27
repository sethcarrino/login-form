const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const moment = require('moment');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const session = require('express-session');
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

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/login', (req, res) =>{
  res.render('login', {
    email: email
    password: password
  })
})

app.post('/login', (req, res) =>{
  let loginInfo = req.body;

  req.checkBody('email', 'Email is Required').notEmpty();

  req.checkBody('password', '')
})
