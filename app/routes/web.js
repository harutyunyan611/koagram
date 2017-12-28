const Router = require("koa-router");
const router = new Router();
const csrfMiddleware = require("../middlewares/csrf");
const authMiddleware = require("../middlewares/auth");
const multipartMiddleware = require('koa2-formidable');
const authController = require("../controllers/auth");
const postController = require("../controllers/posts");
const bodyParser = require('koa-bodyparser');

// const posts = require("./controllers/posts");
router.use(['/posts/create'], multipartMiddleware());
router.use(csrfMiddleware)
        .use(authMiddleware.passportInitialize)
        .use(authMiddleware.passportSession)
        .get('/', postController.index)
        .get('/login', authController.showForm)
        .post('/login', authController.doLogin)
        .get('/posts/create', postController.create)
        .post('/posts/create', postController.store)
        .get('/seed', authController.index)
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