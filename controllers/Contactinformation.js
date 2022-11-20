const contactInformationModel = require('../models/contactInformation');

class Contactinformationcontroller {

    static async create(req, res) {
        const { name } = req.body;
        try {
            const contactInformationCreated = new contactInformationModel({
                name
            });
            await contactInformationCreated.save();
            return res.status(201).json({
                status: 201,
                message: 'Contact information created'
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getAll(req, res) {
        try {
            const data = await contactInformationModel.find();
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
            const contactinformation = await contactInformationModel.findById(req.params.id, "-__v");
            return res.json({
                status: 200,
                data: contactinformation
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async update(req, res) {
        const { name } = req.body;
        try {
            const contactinformation = await contactInformationModel.updateOne({ _id: req.params.id }, { $set: { name } });
            return res.json({
                status: 200,
                data: contactinformation
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async delete(req, res) {
        try {
            const contactinformation = await contactInformationModel.deleteOne({ _id: req.params.id });
            return res.json({
                status: 200,
                data: contactinformation
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = Contactinformationcontroller;