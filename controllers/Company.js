const cityModel = require('../models/cities');
const companyModel = require('../models/company');

class Companycontroller {

    static async create(req, res) {
        const { name, adress, email, phone, City } = req.body;
        try {
            const companyCreated = new companyModel({
                name, adress, email, phone, cities_id: City
            });
            await companyCreated.save();
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
            const data = await contactModel.find().populate('interested_id');
            // const contacts = await contactModel.populate('Company');
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
                data
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = Companycontroller;