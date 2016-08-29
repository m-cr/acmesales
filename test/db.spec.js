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
	var mike;
	beforeEach(function(done){
		db.seed()
		.then(function(){
			return SalesPerson.findOne({
				where: {
					name: 'Mike'
				},
				include: [{
					model: SalesPersonRegion,
					include: [Region]
				}]
			});
		})
		.then(function(_mike){
			mike = _mike;
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

	describe('mike', function(){
		it('is named Mike', function(done){
			expect(mike.name).to.equal('Mike');
			done();
		});
		it('has a region', function(done){
			expect(mike.salespersonregions.length).to.equal(1);
			expect(mike.salespersonregions[0].region.zip).to.equal('11385');
			done();
		});
	});
});



// describe('models', function(){
// 	it('')
// })