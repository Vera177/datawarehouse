const roleModel = require('../models/roles');

class RolesController {
    static async create(req, res) {
        const { name } = req.body;
        try {
            const roleCreated = new roleModel({ name });
            await roleCreated.save();
            return res.status(201).json({
                status: 201,
                message: 'Role created'
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = RolesController;