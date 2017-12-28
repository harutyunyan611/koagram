const mongoose = require("../db");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
module.exports = mongoose.models.Posts || mongoose.model('Posts', new mongoose.Schema({
    // _id: String,
    _id: { type: Schema.Types.ObjectId, default: function () { return new ObjectId() } },
    author: { type: Schema.Types.ObjectId, ref: 'Users' },
    url: String,
    desc: String,
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