var express = require('express');

var router = express.Router();

module.exports = router;

router.get('/', function(req, res, next){
	res.render('regions', {title: 'Acme Sales - Regions', tab: 'regions'});
});

router.post('/', function(req, res, next){
	
	//res.redirect('/regions');
});