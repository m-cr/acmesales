var Sequelize = require('sequelize');
var db = new Sequelize(process.env.DATABASE_URL, {
	logging: false
});
var Promise = require('bluebird');

var SalesPerson = db.define('salesperson', {
	name: Sequelize.STRING
});

var Region = db.define('region', {
	zip: Sequelize.STRING
});

var SalesPersonRegion = db.define('salespersonregion', {});

var sync = function(){
	return db.sync({force:true});
};

var seed = function(){
	return SalesPersonRegion.destroy({where: {} })
	.then(function(){
		return SalesPerson.destroy({ where: {} });
	})
	.then(function(){
		return Region.destroy({ where: {} });
	})
	.then(function(){
		return Promise.all([
			SalesPerson.create({ name: 'Mike'}),
			SalesPerson.create({ name: 'Chris'}),
			SalesPerson.create({ name: 'Brendan'}),
			Region.create({zip: '11385'}),
			Region.create({zip: '11210'}),
			Region.create({zip: '01776'})
			])
			.spread(function(_mike, _chris, _brendan, _ny, _oh, _ma){
				return Promise.all([
					SalesPersonRegion.create({ 
						salespersonId: _mike.id, 
						regionId: _ny.id 
					}),
					SalesPersonRegion.create({ 
						salespersonId: _brendan.id, 
						regionId: _oh.id 
					}),
					SalesPersonRegion.create({ 
						salespersonId: _chris.id, 
						regionId: _ma.id 
					})
				]);
			});
	});
};

SalesPerson.hasMany(SalesPersonRegion);
Region.hasMany(SalesPersonRegion);
SalesPersonRegion.belongsTo(SalesPerson);
SalesPersonRegion.belongsTo(Region);

module.exports = {
	seed: seed,
	sync: sync,
	models: {
		SalesPerson: SalesPerson,
		Region: Region,
		SalesPersonRegion: SalesPersonRegion
	}
};