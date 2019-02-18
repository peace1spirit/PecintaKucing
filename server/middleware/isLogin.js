'use strict'

const jwt = require('jsonwebtoken');
const ModelUser = require('../models/user.model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
//try to make conflict
module.exports = {
    isLogin: (req, res, next) => {    
        if(req.headers.token){
            let decoded = jwt.verify(req.headers.token, process.env.JWT);
            let idCheck = ObjectId(decoded.id)
            ModelUser.findOne({ _id : idCheck, email : decoded.email })
            .then((result) => {
                if(result) {
                    req.currentuser=result
                    next()
                } else {
                    res.status(403).json({ message : 'Token is not valid' });
                }
            })
        }
        else
            res.status(403).json({ message : 'Token not found' });       
    }
}
