const occupationModel = require('../models/occupation');

class Occupationcontroller {

    static async create(req, res) {
        const { name } = req.body;
        try {
            const contactCreated = new occupationModel({
                name
            });
            await contactCreated.save();
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
            const data = await contactModel.find().populate('company_id');
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
            const occupation = await occupationModel.findById(req.params.id, "-password -__v");
            return res.json({
                status: 200,
                data: occupation
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async update(req, res) {
        const { name } = req.body;
        try {
            const occupation = await occupationModel.updateOne({ _id: req.params.id }, { $set: { name } });
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
            const occupation = await occupationModel.deleteOne({ _id: req.params.id });
            return res.json({
                status: 200,
                data: 'Occupation deleted succesfully'
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = Occupationcontroller;