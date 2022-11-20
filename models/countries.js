const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {type: String, require: true},
    regions_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Region'}
});

module.exports = mongoose.model('Country', schema);