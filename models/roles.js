const mongoose = require('mongoose');

const schema = mongoose.mongo.schema({
    name: {type: String, default: 'user', require: true}
});

module.exports = mongoose.model('Roles', schema);