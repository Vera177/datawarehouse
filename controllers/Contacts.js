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
            const contacts = await contactModel.find().populate('company_id').populate('cities_id').populate('occupation_id').populate('contact_information_id').populate('interested_id');
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
}

module.exports = Contactcontroller;