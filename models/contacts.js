const mongoose = require('mongoose');

const schema = mongoose.Schema({
    firstname: {type: String, require: true},
    lastname: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    adress: {type: String, require: true},
    roles_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Roles'},
    company_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Company'},
    occupation_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Occupation'},
    contact_information_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ContactInformation'},
    interested_id: {type: mongoose.Schema.Types.ObjectId, ref: 'InterestLevel'},
    cities_id: {type: mongoose.Schema.Types.ObjectId, ref: 'City'}
});

module.exports = mongoose.model('Contacts', schema);