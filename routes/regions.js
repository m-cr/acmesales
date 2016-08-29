var express = require('express');
var router = express.Router();
var db = require('../db');
var models = db.models;
var SalesPerson = models.SalesPerson;
var Region = models.Region;
var SalesPersonRegion = models.SalesPersonRegion;

module.exports = router;

router.get('/', function(req, res, next){
	Region.findAll({
		where: {},
		include: [{
			model: SalesPersonRegion,
			include: [SalesPerson]
		}]
	})
	.then(function(regions){
		// console.log(salespeople);
		res.render('regions', {
			title: 'Acme Sales - Regions', 
			tab: 'regions',
			regions
		});
	})
	.catch(next);	
});

router.post('/', function(req, res, next){
	//res.redirect('/regions');
});