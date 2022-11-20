const mongoose = require('mongoose');

const schema = mongoose.Schema({
    interest: {type: Number, require: true}
});

module.exports = mongoose.model('InterestLevel', schema);