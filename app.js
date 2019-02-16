const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session')
const app = express();
const Ideas = require('./models/idea')

mongoose.connect('mongodb://localhost:27017/vidtask', {useNewUrlParser: true})
.then(() => console.log('Connected to database'))
.catch(err => console.error('Could not connect to database')); 


app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'))

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

app.use(flash())

//Setting up global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error')
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

app.get('/ideas/add', (req, res)=> {
  let errors = [];
  res.render('ideas',{errors})
})

//Edit idea page

app.get('/ideas/edit/:id', (req, res) => {
  const id = req.params.id
  Ideas
  .findById(id)
  .then(idea => {
    res.render('edit', {idea})
  })
  
})

//Ideas page
app.get('/ideas', (req, res) => {
  Ideas
    .find({})
    .sort({date: 'desc'})
    .then(ideas => {
      res.render('show', {ideas})
    })
})

//Post request for ideas
app.post('/ideas', (req, res) => {
   let errors = [];
   const {title, details} = req.body;
  if(!title){
    errors.push({text: 'Please add a title'})
  }
  if(!details){
    errors.push({text: 'Please add some details'})
  }

  if(errors.length > 0) {
    res.render('ideas', {
      errors,
      title: req.body.title, 
      details: req.body.details 
    })
  } else {
    const idea = new Ideas({
      title,
      details
    })
    .save()
    .then(idea => {
      req.flash('success_msg', 'Video added')
      res.redirect('/ideas')
    })
    
  }
})

//Edit form logic

app.put('/ideas/:id', (req, res) => {
  const id = req.params.id;
  const {title, details} = req.body
  Ideas
  .findByIdAndUpdate(id,{title,details})
  .then(updated => {
    req.flash('success_msg', 'Video idea updated successfully')
    res.redirect('/ideas')
  })
});

app.delete('/ideas/:id', (req, res)=> {
  const id = req.params.id;
  Ideas
  .findByIdAndDelete(id)
  .then(deleted => {
    req.flash('success_msg', 'Video idea removed successfully')
    res.redirect('/ideas')
  })
})



 








const port = 7000;
app.listen( port, () => console.log(`App connected on port ${port}`))