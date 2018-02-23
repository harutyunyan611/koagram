// const post = require("../models/posts");
const csrfMiddleware = require("../middlewares/csrf");
const passport = require("../auth/local");
const user = require("../models/users");
module.exports = {
    showForm: async (ctx, next) => {
        console.log(ctx.isAuthenticated());
        await ctx.render("auth/login", { csrf: ctx.csrf, error: ctx.session.error, auth: await ctx.isAuthenticated() });
        ctx.session.error = [];
    },
    doLogin: async (ctx, next) => {
        return passport.authenticate('local', async function (err, user, info, status) {
            if (user === false) {
                // ctx.body = { success: false, error: info.message }
                ctx.session.error = info.message;
                return ctx.redirect('/login');
                // ctx.throw(401)
            } else {
                await ctx.login(user);
                ctx.cookies.set("uid", user.id, {httpOnly: false});
                return ctx.redirect('/');
            }
        })(ctx)
    },
    destroy: async (ctx, next) => {
        ctx.logout();
        return ctx.redirect('/');
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