const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
//Set some various configs => here, set value pair
app.set('view engine', hbs);
///////////////////////////////////////////////////////////////////////////////////
//MIDDLEWARE app.use()
//Piece of middleware - third party addon
app.use((req, res, next) => {
  //next exists so you can tell express when your middleware function is done
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server log.')
    }
  });
  console.log();
  next();
});

//This middleware makes all pages unusable. Now all are redirect to maintenance.hbs
// app.use((req,res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public')); //Takes the absolute path you want to serve up

///////////////////////////////////////////////////////////////////////////////////
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

///////////////////////////////////////////////////////////////////////////////////
//http route Handler
app.get('/', (req, res) => {
  res.render('home.hbs',{
      pageTitle: 'Nodejs Web Server',
      welcomeMessage: 'Welcome to my new nodejs site'
  });
});
app.get('/about', (req,res) => {
  //res.send('<h1>About page</h1>');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});
app.get('/portfolio', (req,res) => {
  //res.send('<h1>About page</h1>');
  res.render('portfolio.hbs', {
    pageTitle: 'Portifolio Page',
    portfolioText: 'This are my Projects!'
  });
});

app.get('/bad', (req,res) => {
  res.send({
    errorMessage: 'Error handeling request'
  });
});
///////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
