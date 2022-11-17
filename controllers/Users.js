const userModel = require('../models/user');
const roleModel = require('../models/roles');
const jwtHelper = require('../helpers/jwt');

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

    static async getAll(req, res) {
        try {
            const users = await userModel.find().populate('roles_id')
            const data = users.map(user => {
                return {
                    id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    role: {
                        id: user.roles_id._id,
                        name: user.roles_id.name
                    }
                }
            });
            return res.json({
                status: 200,
                data
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await userModel.findOne({ email }).populate('roles_id');
            if (!user) {
                throw { status: 401, message: 'Usuario y/o contraseña invalidos' };
            }
            const match = await user.comparePassword(password);
            if (!match) {
                throw { status: 401, message: 'Usuario y/o contraseña invalidos' };
            }
            const token = jwtHelper.encode({
                checkUser: {
                    id: user._id,
                    role: user.roles_id
                }
            });
            return res.json({
                status: 200,
                token: token
            });            
        } catch (error) {
            return res.status(error.status || 500).json({
                status: error.status || 500,
                message: error.message || 'Internal server error'
            });
        }
    }

    
    static async getById(req, res){
        try {
            const user = await userModel.findById(req.params.id, "-password -__v").populate("roles_id", "-__v");
            return res.json({
                status: 200,
                data: user
            });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    // static async update(req, res){
    //     try {
    //         const user = await userModel.updateOne(req.params.id);
    //         return res.json({
    //             status: 200,
    //             data: user
    //         })
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // }

    static async delete(req, res){
        try {
            const user = await userModel.deleteOne({ _id: req.params.id});
            return res.json({
                status: 200,
                data: user
            })
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = Usercontroller;