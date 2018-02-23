const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const redisStore = require('koa-redis');
const render = require("koa-ejs");
const server = require("http").createServer(app.callback());
const io = require('socket.io')(server);
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dnekxz4te',
    api_key: '854818579966913',
    api_secret: 'cObRE9RqL-MaAx18xxrWuo44GSw'
});
// const sessionFileStore = require("koa-generic-session-file");
const webRoutes = require("./app/routes/web");
const apiRoutes = require("./app/routes/api");
const socketRoutes = require("./app/routes/io")(io);

const config = require('./app/config');

app.keys = ['keys'];
render(app, config.view);
app
// .use(session({
    //     store: new sessionFileStore({
        //         sessionStore: "./session/"
        //     })
        // }))
    .use(bodyParser())
    .use(session(Object.assign(config.session, { store: redisStore({
        url: "redis://redistogo:ed4c3ffdccb0da0fca1102a445c706ad@soldierfish.redistogo.com:10655"
        // port: 13117,
        // db: "koagram"
    })}), app))
    .use(webRoutes.routes())
    .use(webRoutes.allowedMethods())
    .use(apiRoutes.routes())
    .use(apiRoutes.allowedMethods())
    .use(static(__dirname + '/public'));

module.exports = app; 
server.listen(process.env.PORT || config.port);

// exports = app;