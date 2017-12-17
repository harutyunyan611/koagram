const mongoose = require("./db");
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    title: String,
    author: String,
    body: String,
});
module.exports = postsSchema;