const jwt = require('jsonwebtoken');
const userModel = require('../models/model')
const dotenv = require('dotenv').config();

const authenticator = async (req, res,next)=>{
    console.log(req.params.id)
    const newUser = await userModel.findById(req.params.id);
    console.log(newUser)
   const token = newUser.token;
    await jwt.verify(token, process.env.JWT_TOKEN, (err, payLoad)=>{
        if(err){
            return res.status(403).json({
                message: 'token is not valid'
            })
        } else {
            //console.log(req.user)
            req.newUser = payLoad;
            next();
        }
    })
}

// const Authorized = (req, res, next) => {
//     authenticator(req, res, ()=>{
//         if(req.user.isAdmin){
//             next()
//         } else {
//             res.status(403).json({
//                 message: 'You are not an Admin'
//             })
//         }
//     })
// }


const isAdminAuthorized = (req, res, next) => {
    authenticator(req, res, async ()=>{
        const existingUser = await userModel.findById(req.params.id);
        if(existingUser.isAdmin == false){
            res.status(403).json({
                message: 'You are not an Admin'
            })
        } else {
            next()
        }
    })
}

const isSuperAdminAuthorized = (req, res, next) => {
    authenticator(req, res, async ()=>{
        const existingUser = await userModel.findById(req.params.id);
        if(existingUser.isSuperAdmin == false){
            res.status(403).json({
                message: 'You are not a Super Admin'
            })
        } else {
            next()
        }
    })
}


module.exports = {
    isAdminAuthorized,
    isSuperAdminAuthorized
}