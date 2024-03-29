const regionModel = require('../models/regions');

class Regioncontroller {

    static async create(req, res) {
        const { name} = req.body;
        try {
            const regionCreated = new regionModel({
                name
            });
            await regionCreated.save();
            return res.status(201).json({
                status: 201,
                message: `${name} created succesfully`
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getAll(req, res) {
        try {
            const data = await regionModel.find();
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
            const region = await regionModel.findById(req.params.id, "-password -__v");
            return res.json({
                status: 200,
                data: region
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async update(req, res) {
        const { name } = req.body;
        try {
            const region = await regionModel.updateOne({ _id: req.params.id }, { $set: { name } });
            return res.json({
                status: 200,
                data: `${name} updated succesfully`
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async delete(req, res) {
        try {
            const region = await regionModel.deleteOne({ _id: req.params.id });
            return res.json({
                status: 200,
                data: 'Region deleted succesfully'
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = Regioncontroller;