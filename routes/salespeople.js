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
		// console.log(people);
		res.render('salespeople', {
			title: 'Acme Sales - Sales People', 
			tab: 'salespeople',
			people, 
			regions
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

router.delete('/:personId', function(req, res, next){
	SalesPersonRegion.destroy({
		where: {
			salespersonId: req.params.personId
		}
	})
	.then(function(){
		SalesPerson.destroy({
			where: {
				id: req.params.personId
			}
		})
	})
	.then(function(){
		res.redirect('/salespeople');
	})
	.catch(next);
});