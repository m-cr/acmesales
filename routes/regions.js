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
	Promise.all([people, regions])
	.spread(function(people, regions){
		console.log(people);
		res.render('regions', {
			title: 'Acme Sales - Regions', 
			tab: 'regions',
			people, 
			regions
		});
	})
	.catch(next);	
});

router.post('/', function(req, res, next){
	Region.create({
		zip: req.body.zip
	})
	.then(function(){
		res.redirect('/regions');
	})
	.catch(next);
});

router.delete('/:regionId', function(req, res, next){
	SalesPersonRegion.destroy({
		where: {
			regionId: req.params.regionId
		}
	})
	.then(function(){
		Region.destroy({
			where: {
				id: req.params.regionId
			}
		});
	})
	.then(function(){
		res.redirect('/regions');
	})
	.catch(next);
});