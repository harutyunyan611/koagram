var redis = require("redis"),
    client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});



module.exports = {
    show: async (ctx, next) =>{
    	await ctx.render("messages", {auth: await ctx.isAuthenticated()});
    },
    subscribe: (socket, uid) => {
		client.set("s" + socket.id, uid);
    },
    unsubscribe: (socket) => {
		client.del("s" + socket.id);
    },
    get: (data) => {
		client.get("something", function(err, reply) {
		    // reply is null when the key is missing
		    // console.log(reply);
		}); 	
    	console.log(data);
    }
}