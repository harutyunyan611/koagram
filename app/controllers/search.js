const users = require("../models/users");
module.exports = {
    search: async (ctx, next) => {
        var query = await users.find({username: new RegExp(ctx.params.query, "i")})
                           .skip(0)
                           .limit(10)
                           .exec();
        await ctx.render("search", { csrf: ctx.csrf, result: query, auth: await ctx.isAuthenticated() });
    },
};