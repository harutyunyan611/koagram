const cluster = require('cluster');
const app = require("./index.js");
const numCPU = require("os").cpus().length;
const config = require('./app/config');


if (cluster.isMaster) {
	console.log("I'm master");
	for (var i = 0; i < numCPU; i++) {
		cluster.fork();
	}
	for (const id in cluster.workers) {
		cluster.workers[id].on('request', messageHandler);
	}

} else {
	app.use(function(ctx, next){
		console.log("Answered from: " + process.pid);
		next();
	})
	app.listen(process.env.PORT || config.port);
	console.log("Worker " + process.pid + " started");
}