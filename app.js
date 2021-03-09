var express = require('express'),
   env = process.env.NODE_ENV || 'development';

 var forceSsl = function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
 };

// const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true})); 
app.use(bodyParser.urlencoded({ extended: false }))

    if (env === 'production') {
        app.use(forceSsl);
    }

app.get('/', function(req, res) {
    res.render('home');
})


app.get ('/materials', function(req, res) {
    res.render('materials');
});


app.get('/planza', function(req, res) {
    res.render('planza');
})

let port = process.env.PORT;
if(port == null || port == "") {
    port = 3000;
}

app.listen(port, function(req, res) {
    console.log("App is running!");
})