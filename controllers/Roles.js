const roleModel = require('../models/roles');

class RolesController {
    static async create(req, res) {
        const { name } = req.body;
        try {
            const roleCreated = new roleModel({ name });
            await roleCreated.save();
            return res.status(201).json({
                status: 201,
                message: `New ${name}'s role created succesfully`
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getAll(req, res) {
        try {
            const roles = await roleModel.find();
            const data = roles.map((role => ({id: role._id, name: role.name})));
            return res.status(200).json({
                status: 200,
                data
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async getById(req, res){
        try {
            const role = await roleModel.findById(req.params.id, "-password -__v");
            return res.json({
                status: 200,
                data: role
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async update(req, res) {
        const { name } = req.body;
        try {
            const role = await roleModel.updateOne({ _id: req.params.id }, { $set: { name } });
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
            const role = await roleModel.deleteOne({ _id: req.params.id });
            return res.json({
                status: 200,
                data: 'Role deleted succesfully'
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = RolesController;