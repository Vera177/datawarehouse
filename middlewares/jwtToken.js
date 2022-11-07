const jwtHelper = require('../helpers/jwt');

function getToken(req) {
    if (req.headers && req.headers['authorization']) {
        const parts = req.headers['authorization'].split(' ');
        if (parts.length != 2) {
            throw {
                message: 'Format is Authorization: Bearer [token]',
                status: 401
            };
        }
        const [scheme, credentials] = parts;
        if (/^Bearer$/i.test(scheme)) {
            return credentials;
        } else {
            throw {
                message: 'No authorization token was found',
                status: 401
            };
        }
    } else {
        throw {
            message: 'No authorization token was found',
            status: 401
        };
    }
}

function jtwToken(req, res, next) {
    try {
        const token = getToken(req);
        const decoded = jwtHelper.decode(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(error.status).json(error);
    }
}

module.exports= jtwToken;