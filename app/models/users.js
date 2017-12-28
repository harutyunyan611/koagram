const mongoose = require("../db");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const usersSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: function () { return new ObjectId() } },
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Posts' }]
}, {
        timestamps: {
            createdAt: 'created_at'
        }
    });
usersSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
module.exports = mongoose.model('Users', usersSchema);

