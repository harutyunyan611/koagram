// const post = require("../models/posts");
const csrfMiddleware = require("../middlewares/csrf");
const passport = require("../auth/local");
const user = require("../models/users");
module.exports = {
    showForm: async (ctx, next) => {
        console.log(ctx.isAuthenticated());
        await ctx.render("auth/register", { csrf: ctx.csrf, error: ctx.session.error, auth: await ctx.isAuthenticated() });
        ctx.session.error = [];
    },
    doRegister: async(ctx, next) => {
        let { username, password } = ctx.request.body;
        let newUser = new user({
            username: username,
            password: password,
        });
        try {
            await newUser.save();
            ctx.redirect("/login")
        } catch ($e) {
            ctx.session.error = $e.errmsg;
            return ctx.redirect('/register');
        }
    },
    index: async function (ctx, next) {
        // ctx.body = JSON.stringify(post.findAll());
        let asd = new user({
            username: "admin",
            password: "admin",
        })
        asd.save();
        await ctx.render("homepage", { auth: await ctx.isAuthenticated() });
        // ctx.body = JSON.stringify();
    }
};