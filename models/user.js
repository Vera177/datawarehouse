const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({
    firstname: {type: String, require: true},
    lastname: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    roles_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Roles'}
});

schema.pre('save', function(next) {
    if(!this.isModified('password')) {
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

schema.methods.comparePassword = function(plaintext, callback) {
    return new Promise((resolve, reject) => {
        return resolve(bcrypt.compareSync(plaintext, this.password));
    });
}

module.exports = mongoose.model('Users', schema);