const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt")

let UserSchema = new Schema({
    schEmail: String,
    address: String,
    schName: String,
    adminName: String,
    password: String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(0));
};

UserSchema.methods.validatePassword = function (plainPassword, harshPassword) {
    return bcrypt.compareSync(plainPassword, harshPassword)
}
module.exports = mongoose.model('User', UserSchema);