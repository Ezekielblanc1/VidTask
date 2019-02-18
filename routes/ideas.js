const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Ideas = require('../models/idea')

const { ensureAuth} = require('../helper/auth');

router.get('/add',ensureAuth, (req, res)=> {
  let errors = [];
  res.render('ideas',{errors})
})



//Ideas page
router.get('/',ensureAuth, (req, res) => {
  Ideas
    .find({})
    .sort({date: 'desc'})
    .then(ideas => {
      res.render('show', {ideas})
    })
})

//Post request for ideas
router.post('/',ensureAuth, (req, res) => {
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


//Edit idea page

router.get('/edit/:id',ensureAuth, (req, res) => {
  const id = req.params.id
  Ideas
  .findById(id)
  .then(idea => {
    res.render('edit', {idea})
  })
  
})
//Edit form logic

router.put('/:id',ensureAuth, (req, res) => {
  const id = req.params.id;
  const {title, details} = req.body
  Ideas
  .findByIdAndUpdate(id,{title,details})
  .then(updated => {
    req.flash('success_msg', 'Video idea updated successfully')
    res.redirect('/ideas')
  })
});

router.delete('/:id',ensureAuth, (req, res)=> {
  const id = req.params.id;
  Ideas
  .findByIdAndDelete(id)
  .then(deleted => {
    req.flash('success_msg', 'Video idea removed successfully')
    res.redirect('/ideas')
  })
})

module.exports = router;