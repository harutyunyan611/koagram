const Post = require("../models/posts");
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
        let imageUrl = await new Promise(function(resolve, reject){
            cloudinary.uploader.upload(files.image.path, async function (result) {
                if (result.secure_url) {
                    resolve(result.secure_url);            
                }
                console.log(result)
            });
        });
        let newPost = new Post({
            url: imageUrl,
            desc: body.description,
            author: ctx.state.user._id,
        })
        // console.log(users.findOne({ _id: ctx.state.user._id }).posts);
        await users.findOne({ _id: ctx.state.user._id }).exec(function(err, res) {
            res.posts.push(newPost._id);
            res.save();
            newPost.save();
        });
        await ctx.redirect("/posts/");
    },
    list: async (ctx, next) =>{
        console.log("cookie: ",ctx.cookies.get("io"))
        let {err, posts} = await users.findOne({_id: ctx.state.user._id}).populate("posts").exec();
        await ctx.render("posts/list", {auth: await ctx.isAuthenticated(), posts: posts})
    },
    index: async function (ctx, next) {
        // ctx.body = JSON.stringify(Post.findAll());
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
        await ctx.render("homepage", { auth: await ctx.isAuthenticated(), posts: await Post.find({}) });
        // ctx.body = JSON.stringify();
    },
    remove: async (ctx, next) => {
        try {
            let postOne = await Post.findOne({author: ctx.state.user._id, _id: ctx.params.id}).remove();
            console.log(postOne.documents);
            console.log(postOne.desc);
            ctx.redirect("/posts/");
        } catch (error) {
            ctx.body = error;
        }
    },
    editForm: async(ctx, next) => {
        let postOne = await Post.findOne({ author: ctx.state.user._id, _id: ctx.params.id }).exec();
        await ctx.render("posts/edit", { csrf: ctx.csrf, error: ctx.session.error, auth: await ctx.isAuthenticated(), post: postOne } );
    },
    edit: async (ctx, next) => {
        let {body, files} = ctx.request;
        try {
            let postOne = await Post.findOne({ author: ctx.state.user._id, _id: ctx.params.id }).exec();
            postOne.desc = body.description;
            await postOne.save()
        } catch (error) {
            ctx.body = err;
            return false;                    
        }
        ctx.redirect("/posts/");
    },
};