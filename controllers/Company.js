const cityModel = require('../models/cities');
const companyModel = require('../models/company');

class Companycontroller {

    static async create(req, res) {
        const { name, adress, email, phone, city } = req.body;
        try {
            const city2 = cityModel.findOne({'name': city}).then(data => {
                const city3 = data._id;
                const city4 = city3.toString();                
                const companyCreated = new companyModel({
                    name, adress, email, phone, cities_id: city4
                });
                companyCreated.save();
                return res.status(201).json({
                    status: 201,
                    message: 'Company created'
                });
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getAll(req, res) {
        try {
            const data = await companyModel.find().populate({path: 'cities_id', populate: {path: 'countries_id', populate: {path: 'regions_id'}}});
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
            const company = await companyModel.findById(req.params.id, "-__v").populate("cities_id", "-__v");
            return res.json({
                status: 200,
                data: company
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async update(req, res){
        const {name, adress, email, phone, cities_id} = req.body;
        try {
            const company = await companyModel.updateOne({ _id: req.params.id},{ $set: {name, adress, email, phone, cities_id}});
            return res.json({
                status: 200,
                data: 'Company updated succesfully'
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async delete(req, res){
        try {
            const company = await companyModel.deleteOne({ _id: req.params.id});
            return res.json({
                status: 200,
                data: 'Company deleted succesfully'
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = Companycontroller;