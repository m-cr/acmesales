var express = require('express');
var router = express.Router();
var db = require('../db');
var models = db.models;
var SalesPerson = models.SalesPerson;
var Region = models.Region;
var SalesPersonRegion = models.SalesPersonRegion;

module.exports = router;

router.get('/', function(req, res, next){
	var people = SalesPerson.findAll();
	var regions = Region.findAll();



	SalesPerson.findAll({
		where: {},
		include: [{
			model: SalesPersonRegion,
			include: [Region]
		}]
	})
	.then(function(salespeople){
		// console.log(salespeople);
		res.render('salespeople', {
			title: 'Acme Sales - Sales People', 
			tab: 'salespeople',
			salespeople
		});
	})
	.catch(next);	

});

router.post('/', function(req, res, next){

	//res.redirect('/salespeople');
});