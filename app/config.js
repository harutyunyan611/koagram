const path = require('path');
module.exports = {
    port: 3000,
    // db: 'mongodb://localhost/test',
    db: 'mongodb://admin:admin@ds133557.mlab.com:33557/koagram',
    session: {
        key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
        rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
    },
    view: {
        root: path.join(__dirname, 'views'),
        layout: 'template',
        viewExt: 'ejs',
        cache: false,
        debug: false
    }
}