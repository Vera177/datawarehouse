const userModel = require('../models/user');
const roleModel = require('../models/roles');

class Usercontroller {

    static async create(req, res) {
        const { firstname, lastname, email, password, role } = req.body;
        try {
            const roleFound = await roleModel.findOne({ _id: role });
            if (!roleFound) {
                return res.status(400).json({
                    status: 400,
                    error: 'Role ID not found'
                });
            }
            const userCreated = new userModel({
                firstname, lastname, email, password, roles_id: role
            });
            await userCreated.save();
            return res.status(201).json({
                status: 201,
                message: 'User created'
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = Usercontroller;