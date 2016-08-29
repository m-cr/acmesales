var express = require('express');
var swig = require('swig');
swig.setDefaults({cache:false});
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/salespeople', require('./routes/salespeople'));
app.use('/regions', require('./routes/regions'));
app.use('/salespersonregions', require('./routes/salespersonregions'));

app.get('/', function(req, res, next){
	res.render('index', {title: 'Acme Sales', tab: 'home'});
});

module.exports = app;