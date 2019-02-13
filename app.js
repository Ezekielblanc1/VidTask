const express = require('express');
const app = express();

app.set("view engine", "ejs")
//Index route
app.get('/', (req, res) => {
  res.render('index')
})

//About route
app.get('/about', (req, res) => {
  res.render('about')
})












const port = 7000;
app.listen( port, () => console.log(`App connected on port ${port}`))