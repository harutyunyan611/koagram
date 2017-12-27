const Router = require("koa-router");
const router = new Router();
const csrfMiddleware = require("../middlewares/csrf");
const authMiddleware = require("../middlewares/auth");
const authController = require("../controllers/auth");

// const posts = require("./controllers/posts");
router.use(csrfMiddleware)
        .use(authMiddleware.passportInitialize)
        .use(authMiddleware.passportSession)
        .get('/', authController.index)
        .get('/login', authController.showForm)
        .post('/login', authController.doLogin)
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