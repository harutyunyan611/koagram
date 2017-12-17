const mongoose = require("../schemas/db");
const postCollection = require("../schemas/PostsCollection");
const posts = mongoose.model('Posts', postCollection);
module.exports = posts;