const jwtHelper = require('../helpers/jwt');

function isAdmin(req, res, next) {
    try {
        if (req.user.checkUser.role.name != "admin") {
            return res.status(401).json({ status: 401, message: "unauthorized" });
        }
        next();
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = isAdmin;