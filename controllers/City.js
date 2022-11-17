const cityModel = require('../models/cities');
const countryModel = require('../models/countries');

class Citycontroller {

    static async create(req, res) {
        const { name, country } = req.body;
        try {
            const cityCreated = new cityModel({
                name, countries_id: country
            });
            await cityCreated.save();
            return res.status(201).json({
                status: 201,
                message: 'City created'
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getAll(req, res) {
        try {
            const data = await cityModel.find().populate('countries_id');
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

    static async getById(req, res){
        try {
            const city = await cityModel.findById(req.params.id, "-__v");
            return res.json({
                status: 200,
                data: city
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = Citycontroller;