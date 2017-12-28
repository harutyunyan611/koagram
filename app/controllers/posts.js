const post = require("../models/posts");
const users = require("../models/users");
const cloudinary = require('cloudinary');
module.exports = {
    create: async (ctx, next) => {
        console.log(ctx.isAuthenticated());
        await ctx.render("posts/create", { csrf: ctx.csrf, error: ctx.session.error, auth: await ctx.isAuthenticated() });
        ctx.session.error = [];
    },
    store: async (ctx, next) => {
        // ctx.body = ctx.request.;
        let { body, files } = ctx.request
        // console.log(files.image.path);
        cloudinary.uploader.upload(files.image.path, async function (result) {
            if (result.secure_url) {
                let newPost = new post({
                    url: result.secure_url,
                    desc: body.description,
                    author: ctx.state.user._id,
                })
                // console.log(users.findOne({ _id: ctx.state.user._id }).posts);
                await users.findOne({ _id: ctx.state.user._id }).exec(function(err, res) {
                    res.posts.push(newPost._id);
                    res.save();
                    newPost.save();
                });
            }
            console.log(result)
        });

    },
    index: async function (ctx, next) {
        // ctx.body = JSON.stringify(post.findAll());
        // let asd = new user({
            // username: "admin",
            // password: "admin",
        // })
        // asd.save();
        // let a = await users.findOne({}).populate("posts").exec(function(err, res) {
        //     console.log(res.posts.url);
        // });
        // ctx.body = await users.findOne({ _id: ctx.state.user._id }).populate('posts').exec();
        // await users.findOne({ _id: ctx.state.user._id }).populate('posts').exec()
        await ctx.render("homepage", { auth: await ctx.isAuthenticated(), posts: await post.find({}) });
        // ctx.body = JSON.stringify();
    }
};