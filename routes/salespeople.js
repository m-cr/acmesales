var express = require('express');
var router = express.Router();
var db = require('../db');
var models = db.models;
var SalesPerson = models.SalesPerson;
var Region = models.Region;
var SalesPersonRegion = models.SalesPersonRegion;
var Promise = require('bluebird');
module.exports = router;

router.get('/', function(req, res, next){
  //again figure out if you need both includes
	var regions = Region.findAll({
		where: {},
		include: [{
			model: SalesPersonRegion,
			include: [SalesPerson]
		}]
	});
	var people = SalesPerson.findAll({
		where: {},
		include: [{
			model: SalesPersonRegion,
			include: [Region]
		}]
	});
  //interesting because you don't use this in regions get route-- and since these are inverses of the same thing, guessing you might not need it here..
	var salespersonregions = SalesPersonRegion.findAll();

	Promise.all([people, regions, salespersonregions])
	.spread(function(people, regions, salespersonregions){
		res.render('salespeople', {
			title: 'Acme Sales - Sales People', 
			tab: 'salespeople',
			people,
			regions,
			salespersonregions
		});
	})
	.catch(next);	
});

router.post('/', function(req, res, next){
	SalesPerson.create({
		name: req.body.name
	})
	.then(function(){
		res.redirect('/salespeople');
	})
	.catch(next);
});

router.delete('/:id', function(req, res, next){
	SalesPersonRegion.destroy({
		where: {
			salespersonId: req.params.id 
		}
	})
	.then(function(){
		SalesPerson.destroy({
			where: {
				id: req.params.id
			}
		})
	})
	.then(function(){
		res.redirect('/salespeople');
	})
	.catch(next);
});
