const passport = require('../auth/local');
const authfMiddleware = {
    passportInitialize: passport.initialize(),
    passportSession: passport.session(),
};
module.exports = authfMiddleware;