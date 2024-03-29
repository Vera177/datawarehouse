const contactModel = require('../models/contacts');
const companyModel = require('../models/company');
const occupationModel = require('../models/occupation');
const contactInformationModel = require('../models/contactInformation');
const interestModel = require('../models/interest');
const cityModel = require('../models/cities');

class Contactcontroller {

    static async create(req, res) {
        const { firstname, lastname, email, adress, company, occupation, contactInformation, interestedPercentage, City } = req.body;
        try {
            const contactCreated = new contactModel({
                firstname, lastname, email, adress, company_id: company, occupation_id: occupation, contact_information_id: contactInformation, interested_id: interestedPercentage, cities_id: City
            });
            await contactCreated.save();
            return res.status(201).json({
                status: 201,
                message: 'Contact created'
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getAll(req, res) {
        try {
            const {email, name, lastname, adress, company, occupation} = req.query;
            const query = {};
            if(email) query.email = {$regex: email};
            if(name) query.firstname = name;
            if(lastname) query.lastname = lastname;
            if(adress) query.adress = {$regex: adress};
            // if(company) query.company_id.name = company;
            // if(occupation) query.occupation_id = {$regex: occupation};
            const contacts = await contactModel.find(query).populate({path: 'company_id', populate: {path: 'cities_id', populate: {path: 'countries_id', populate: {path: 'regions_id'}}}}).populate({path: 'cities_id', populate: {path: 'countries_id', populate: {path: 'regions_id'}}}).populate('occupation_id').populate('contact_information_id').populate('interested_id');
            // const data = contacts.map(contact => {
            //     return {
            //         id: contact._id,
            //         firstname: contact.firstname,
            //         lastname: contact.lastname,
            //         email: contact.email,
            //         adress: contact.adress,
            //         company: {
            //             id: contact.company_id._id,
            //             name: contact.company_id.name
            //         }
            //     }
            // });
            return res.json({
                status: 200,
                contacts
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getById(req, res){
        try {
            const contact = await contactModel.findById(req.params.id, "-__v").populate({path: 'company_id', populate: {path: 'cities_id', populate: {path: 'countries_id', populate: {path: 'regions_id'}}}}).populate({path: 'cities_id', populate: {path: 'countries_id', populate: {path: 'regions_id'}}}).populate('occupation_id', '-__v').populate('contact_information_id', '-__v').populate('interested_id', '-__v');
            return res.json({
                status: 200,
                data: contact
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async update(req, res){
        const {firstname, lastname, email, adress, company_id, occupation_id, contact_information_id, interested_id, cities_id} = req.body;
        try {
            const contact = await contactModel.updateOne({ _id: req.params.id},{ $set: {firstname, lastname, email, adress, company_id, occupation_id, contact_information_id, interested_id, cities_id}});
            return res.json({
                status: 200,
                data: 'Contact updated succesfully'
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async delete(req, res){
        try {
            const contact = await contactModel.deleteOne({ _id: req.params.id});
            return res.json({
                status: 200,
                data: 'Contact deleted succesfully'
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = Contactcontroller;