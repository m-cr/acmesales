var express = require('express');
var router = express.Router();
var db = require('../db');
var models = db.models;
var SalesPerson = models.SalesPerson;
var Region = models.Region;
var SalesPersonRegion = models.SalesPersonRegion;
var Promise = require('bluebird');

module.exports = router;

router.post('/:salespersonid/:regionid', function(req, res, next){
	SalesPersonRegion.create({ 
		salespersonId: req.params.salespersonid*1, 
		regionId: req.params.regionid*1 
	})
	.then(function(association){
		// console.log(association);
		res.redirect(req.query.backURL);
	})
	.catch(next);
});

router.delete('/:salespersonid/:regionid', function(req, res, next){
	SalesPersonRegion.destroy({
		where: {
			salespersonId: req.params.salespersonid*1, 
			regionId: req.params.regionid*1 
		}
	})
	.then(function(){
		res.redirect(req.query.backURL);
	})
	.catch(next);
});