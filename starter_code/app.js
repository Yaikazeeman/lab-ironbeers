
const express = require('express');
const hbs     = require('hbs');
const app     = express();
const path    = require('path');
const port    = 3000;
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(path.join(__dirname, 'public')));

//home
app.get('/', (req, res, next) => {
  res.render('index');
});


//beers
app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers: beers})
  })
  .catch(error => {
    console.log(error)
  })
});

// random beers
app.get('/random-beers', (req, res, next) => {
  punkAPI.getRandom()
  .then(beers => {
    res.render('random-beers', {beers: beers})
  })
  .catch(error => {
    console.log(error)
  })
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
