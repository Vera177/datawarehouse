const cityModel = require('../models/cities');
const countryModel = require('../models/countries');
const regionModel = require('../models/regions');

class Countrycontroller {

    static async create(req, res) {
        const { name, region } = req.body;
        try {
            const countryCreated = new countryModel({
                name, regions_id: region
            });
            await countryCreated.save();
            return res.status(201).json({
                status: 201,
                message: 'Country created'
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getAll(req, res) {
        try {
            const data = await countryModel.find().populate('regions_id');
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

module.exports = Countrycontroller;