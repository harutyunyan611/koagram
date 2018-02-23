const messageController = require("../controllers/messages");
module.exports = function(io){
	io.on("connection", function(socket){
		console.log(socket.id);
		socket.on("messageGet", messageController.get);
		socket.on("messagesSubscribe", (data) => messageController.subscribe(socket,data));
	});
};