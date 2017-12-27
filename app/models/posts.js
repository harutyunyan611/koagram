const mongoose = require("../db");
module.exports = mongoose.models.Posts || mongoose.model('Posts', new mongoose.Schema({
    title: String,
    author: String,
    body: String,
}));
// const postCollection = require("../schemas/PostsCollection");
// let posts;
// try {
    // posts = mongoose.model('Posts');
// } catch (error) {
    // posts = ;
// }
// const posts = ;


// const mongoose = require("./db");
// const Schema = mongoose.Schema;
// 
// const postsSchema = ;
// module.exports = postsSchema;