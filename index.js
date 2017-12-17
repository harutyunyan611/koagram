const Koa = require('koa');
const static = require('koa-static');
const routes = require('./app/routes');
const webRoutes = require("./app/routes/web");
const apiRoutes = require("./app/routes/api");
const config = require('./app/config');
const app = new Koa();

app
    .use(webRoutes.routes())
    .use(webRoutes.allowedMethods())
    .use(apiRoutes.routes())
    .use(apiRoutes.allowedMethods())
    .use(static(__dirname + '/public'));
app.listen(config.port);