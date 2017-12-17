const Koa = require('koa');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const render = require("koa-ejs");
// const sessionFileStore = require("koa-generic-session-file");
const app = new Koa();
const webRoutes = require("./app/routes/web");
const apiRoutes = require("./app/routes/api");
const config = require('./app/config');

app.keys = ['keys'];
render(app, config.view);
app
    .use(bodyParser())
    // .use(session({
    //     store: new sessionFileStore({
    //         sessionStore: "./session/"
    //     })
    // }))
    .use(session(config.session, app))
    .use(webRoutes.routes())
    .use(webRoutes.allowedMethods())
    .use(apiRoutes.routes())
    .use(apiRoutes.allowedMethods())
    .use(static(__dirname + '/public'));
app.listen(config.port);