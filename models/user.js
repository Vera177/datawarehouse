const mongoose = require('mongoose');

const schema = mongoose.Schema({
    firstname: {type: String, require: true},
    lastname: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    roles_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Roles'}
});

module.exports = mongoose.model('Users', schema);