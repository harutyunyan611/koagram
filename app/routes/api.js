const Router = require("koa-router");
const router = new Router();
const posts = require("../controllers/posts");

// router.get('/', function(ctx, next) {
//     ctx.body = "Hi from koa";
//     // return next();
// });
router.get('/posts', posts.index);
module.exports = router;