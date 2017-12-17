const Router = require("koa-router");
const router = new Router();
const csrfMiddleware = require("../middlewares/csrf");

// const posts = require("./controllers/posts");
router.use(csrfMiddleware)
        .get('/login', async (ctx, next) => {
            await ctx.render("auth/login", {csrf: ctx.csrf});
        })
        .post('/login', async (ctx, next) => {
            ctx.body = ctx.request.body;
        })
        .get('/asd', async function(ctx, next) {
            ctx.type = 'text/html';
            ctx.body = "Hi from koadдդ<br>";
            ctx.body += ctx.csrf;
            ctx.body = "Hi from koadдդ<br>";
            ctx.body += ctx.session.views;
            // return next();
        })
        .get("/asdd", async function(ctx, next) {
            ctx.session.views = ctx.session.views+1;
            ctx.body += ctx.csrf;
        })
// router.get('/', posts.index);

module.exports = router;