const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/users.js');
const bcrypt = require('bcrypt');
passport.serializeUser(function (user, done) {
    done(null, user._id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id, done);
})
passport.use(new LocalStrategy(
    function (username, password, done) {
        // User.findOne({ username: username }, function (err, user) {
        //     if (err) { return done(err); }
        //     if (!user) {
        //         return done(null, false, { message: 'Incorrect username.' });
        //     }
        //     if (!user.validPassword(password)) {
        //         return done(null, false, { message: 'Incorrect password.' });
        //     }
        //     return done(null, user);
        // });
        User.findOne({ username: username }, function (err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            console.log(user);
            // test a matching password
            bcrypt.compare(password, user.password).then(function (res) {
                if (!res) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
                // console.log('Password123:', isMatch); // -> Password123: true
            });
            // User.comparePassword(password, function (err, isMatch) {
            //     if (err) throw err;
            //     if (!isMatch) {
            //         return done(null, false, { message: 'Incorrect password.' });
            //     }
            //     return done(null, user);
            //     // console.log('Password123:', isMatch); // -> Password123: true
            // });
        });
    }
));
module.exports = passport;