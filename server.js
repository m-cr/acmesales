var db = require('./db');

var server = require('http').createServer(require('./app'));

db.sync()
.then(function(){
	return db.seed();
})
.catch(function(err){
	console.error(err);
});

server.listen(process.env.PORT, function () {
	console.log('listening on port' + process.env.PORT);
});