const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {type: String, require: true},
    countries_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Country'}
});

module.exports = mongoose.model('City', schema);