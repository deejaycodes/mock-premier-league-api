const jwt = require('jsonwebtoken')
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        let token = req.header('Authorization');
        if(!token){
            return res.status(401).send({
                code:401,
                error:true,
                message:'Pls provide authentication'
            });
        }

        token = token.replace('Bearer ', '')
        const decoded = jwt.verify(token, 'secretkey')
         const id = decoded._id;
        const user = await User.findOne({ _id: id, 'tokens.token': token }).exec();
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
};

module.exports = auth;


