const interestModel = require('../models/interest');

class Interestcontroller {

    static async create(req, res) {
        const { interest } = req.body;
        try {
            const interestedPercentage = new interestModel({
                interest
            });
            await interestedPercentage.save();
            return res.status(201).json({
                status: 201,
                message: 'Interest number created'
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getAll(req, res) {
        try {
            const data = await interestModel.find();
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

module.exports = Interestcontroller;