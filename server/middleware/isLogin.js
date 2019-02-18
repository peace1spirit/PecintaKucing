'use strict'

const jwt = require('jsonwebtoken');
const ModelUser = require('../models/user.model')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
//try to make conflict
module.exports = {
    isLogin: (req, res, next) => {    
        if(req.headers.token){
            try {
                let decoded = jwt.verify(req.headers.token, process.env.JWT);
                console.log(decoded)
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
            } catch (error) {
                console.log(error)
                res.status(403).json({ message : error.message }); 
            }
            
        }
        else
            res.status(403).json({ message : 'Token not found' });       
    }
}
