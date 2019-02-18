const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const axios = require('axios')
class UserController {

    static register (req,res){    
        const { name,email, password, role } = req.body
        UserModel
        .create({ 
            name:name,
            email:email, 
            password: password,
            role: role
         })
        .then((result) => {
            res.status(201).json({
                message: "Register successfully",
            })
        }).catch((err) => {
            res.status(500).json({ message: `Register failed, ${err.message}` })
        });
    }
    static login (req,res){
        const { email, password , admin } = req.body
        UserModel
        .findOne({ email: email })
        .then(result => {
            let flag = bcrypt.compareSync(password, result.password);
            if(flag) {
                if (admin){
                    if(result.role!=='admin'){
                        reject()
                    }
                }
                const Payload= {
                    id: result._id,
                    name: result.name,
                    email: result.email,
                    role: result.role
                }
                res.status(200).json({
                    message: 'Login successfully',
                    token: jwt.sign(Payload, process.env.JWT,{ expiresIn: 60 } ),
                    user: { id: result._id, name: result.name, email: result.email }
                })
            } else {
                reject()
            }    
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ error: err })
        })
    }
    static checkadminToken(req,res){
        if(req.currentuser.role!=='admin'){
            reject()
        }
        const Payload= {
            id: req.currentuser._id,
            name: req.currentuser.name,
            email: req.currentuser.email
        }
        res.status(200).json({
            message: 'Login success',
            user: Payload
        })
    }
    
    static checkToken(req,res){    
        const Payload= {
            id: req.currentuser._id,
            name: req.currentuser.name,
            email: req.currentuser.email
        }
        res.status(200).json({
            message: 'Login success',
            user: Payload
        })
    }

    static getUser (req,res){
        if(req.currentuser.role ==='admin'){
            UserModel.find({})
            .then((result) => {
                res.status(200).json({
                    message: 'Get data users successfully',
                    data: result
                })    
            }).catch((err) => {
                res.status(500).json({ message: 'Get data users failed' })
            });          
        }else{
            res.status(500).json({ message: 'Invalid user' })
        }       
    }
    static userUpdate (req, res) {  
        let updateValue={}; 
        Object.assign(updateValue, 
            req.body.name ? { name : req.body.name } : null,
            req.body.email ? { email : req.body.email } : null,
            req.body.password ? { password: req.body.password } :null,
            req.body.role ? { password: req.body.role } :null,
        );
        UserModel
            .findOneAndUpdate(
                { _id: req.currentuser._id },updateValue)
            .then((result) => {
                return res.status(200).json({
                    message: "User Successfully Updated",
                    result
                })
            }).catch((err) => {
                res.status(500).json({ message: 'Update user failed,', err });
            });
    }
    static userDelete (req, res) {  
        UserModel
        .deleteOne({_id: req.params.id})
        .then((result) => {
            res.status(200).json({
                message: "User successfully deleted",
                result
            })
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    }
}
module.exports = UserController