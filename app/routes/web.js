const Router = require("koa-router");
const router = new Router();
const csrfMiddleware = require("../middlewares/csrf");
const authMiddleware = require("../middlewares/auth");
const authedMiddleware = require("../middlewares/authed");
const multipartMiddleware = require('koa2-formidable');
const authController = require("../controllers/auth");
const postController = require("../controllers/posts");
const registerController = require("../controllers/register")
const messageController = require("../controllers/messages");
const searchController = require("../controllers/search");
const bodyParser = require('koa-bodyparser');

// const posts = require("./controllers/posts");
router.use(csrfMiddleware)
      .use(authMiddleware.passportInitialize)
      .use(authMiddleware.passportSession);
router.use(['/posts/create', '/posts/edit/:id'], multipartMiddleware());
router.use(['/posts/'], authedMiddleware("/"));
router.get('/', postController.index)

      .get('/login', authController.showForm)
      .post('/login', authController.doLogin)
      .get('/register', registerController.showForm)
      .post('/register', registerController.doRegister)
      .get("/logout", authController.destroy)

      .get('/posts/', postController.list)
      .get('/posts/create', postController.create)
      .post('/posts/create', postController.store)
      .get('/posts/delete/:id', postController.remove)
      .get('/posts/edit/:id', postController.editForm)
      .post('/posts/edit/:id', postController.edit)
      
      .get('/messages/:id', messageController.show)
        
      .get('/search/:query', searchController.search)

      .get('/seed', authController.index)
      .get('/asd', async function(ctx, next) {
            ctx.type = 'text/html';
            ctx.body = "Hi from koadдդ<br>";
            ctx.body += ctx.csrf;
            ctx.body = "Hi from " + "pid" + "<br>";
            ctx.body += ctx.session.views;
            // return next();
        })
        .get("/asdd", async function(ctx, next) {
            ctx.session.views = ctx.session.views+1;
            ctx.body += ctx.csrf;
        })
// router.get('/', posts.index);

module.exports = router;