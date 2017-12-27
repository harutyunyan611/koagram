const post = require("../models/posts");
module.exports = {
    index: async function(ctx, next) {
        // ctx.body = JSON.stringify(post.findAll());
        // let asd = new post({
        //     title: "MyTitle",
        //     author: "Myself",
        //     body: "lorem ipsum dolor sit amet"
        // })
        // asd.save();
        ctx.body = JSON.stringify(await post.find({}).exec());
    }
};