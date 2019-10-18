const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const jwt_key = process.env.JWT_KEY || 'blashyrkhRavendark';
        const token = req.header('Authorization').replace('Bearer ', '');
        const data = jwt.verify(token, jwt_key);
        const user = await User.findOne({_id: data._id, 'tokens.token': token});
        if(!user) {
            throw new Error('Not Authorized to access this resource');
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({error: 'Not Authorized to access this resource'});
    }
};

module.exports = auth;