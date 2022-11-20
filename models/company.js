const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {type: String, require: true},
    adress: {type: String, require: true},
    email: {type: String, require: true},
    phone: {type: Number, require: true },
    cities_id: {type: mongoose.Schema.Types.ObjectId, ref: 'City'}
});

module.exports = mongoose.model('Company', schema);