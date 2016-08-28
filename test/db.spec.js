var db = require('../db');
var expect = require('chai').expect;

var models = db.models;

var SalesPerson = models.SalesPerson;
var Region = models.Region;
var SalesPersonRegion = models.SalesPersonRegion;

describe('models', function () {

	before(function(done){
		db.sync()
		.then(function(){
			done();
		})
		.catch(done);
	});

	beforeEach(function(done){
		db.seed()
		.then(function(){
			done();
		})
		.catch(done);
	});

	it('exists', function(done){
		expect(SalesPerson).to.be.ok;
		expect(SalesPersonRegion).to.be.ok;
		expect(Region).to.be.ok;
		done();
	});

	describe('region')
});



// describe('models', function(){
// 	it('')
// })