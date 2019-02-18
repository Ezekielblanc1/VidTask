const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const app = express();

//Passport config
require('./config/passport')(passport);


//Load the routes
const ideaRoute = require('./routes/ideas')
const usersRoute = require('./routes/users')



mongoose.connect('mongodb://localhost:27017/vidtask', {useNewUrlParser: true})
.then(() => console.log('Connected to database'))
.catch(err => console.error('Could not connect to database')); 


app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')))

//Method override middleware
app.use(methodOverride('_method'))

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

//Setting up global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next(); 
})
//Index route
app.get('/', (req, res) => {
  res.render('index')
})

//About route
app.get('/about', (req, res) => {
  res.render('about')
 
})




//Use the routes

app.use('/ideas', ideaRoute)
app.use('/users', usersRoute)
 








const port = 7000;
app.listen( port, () => console.log(`App connected on port ${port}`))