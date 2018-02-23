module.exports = function(redirectLink) {
    return function(ctx,next) {
        if (ctx.isAuthenticated()) {
            return next();
        }
        ctx.redirect(redirectLink);
    }
}