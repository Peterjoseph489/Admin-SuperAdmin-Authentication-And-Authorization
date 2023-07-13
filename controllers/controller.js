const userModel = require('../models/model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const emailSender = require('./email')

exports.newUser = async (req, res)=>{
    try {
        const {username, email, password} = req.body
        const checkEmail = await userModel.findOne({email:email})
        if(checkEmail) {
            res.status(400).json({
                message: 'Email already Exists'
            })
        } else {
            const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt)
        const data = {
            username,
            email,
            password: hash
        }
        const createUser = new userModel(data)

        // Generate a token
        const newToken = jwt.sign({
            username,
            password
        }, process.env.JWT_TOKEN, {expiresIn: '1d'})
        createUser.token = newToken

        const subject = 'Kindly Verify'
        const link = `${req.protocol}://${req.get('host')}/api/userverify/${createUser.id}`
        const message = `Welcome onboard, kindily use this link ${link} to verify your account.`
        emailSender({
            email: createUser.email,
            subject,
            message
        })

        const create = await createUser.save();
        if(!create) {
            res.status(400).json({
                message: "Failed to create",
                error: error.message
            })
        } else {
            res.status(201).json({
                message: "Successfully created",
                data: create
            })
        }
        }
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
    

// User Verify
exports.userVerify = async (req, res)=>{
    try {
        const verified = await userModel.findByIdAndUpdate(req.params.id, {isVerified: true})
        if (!verified) {
            res.status(404).json({
                message: 'User is not verified yet'
            })
        } else {
            res.status(200).json({
                message: `User with Email: ${verified.email} verified successfully`
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}





exports.signIn = async (req, res)=>{
    try{
        const {username, password} = req.body
        const user = await userModel.findOne({username: username});
        if(!user) {
            res.status(404).json({
                message: 'User does not exist'
            })
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                res.status(400).json({
                    message: 'Invalid Password, Try Again'
                })
            } else {
                const token = jwt.sign({
                    username,
                    password
                }, process.env.JWT_TOKEN, {expiresIn: '1h'})
            }

            // Generate Token
            const createToken = jwt.sign({
                username,
                password
            }, process.env.JWT_TOKEN, {expiresIn: '1d'})
            user.token = createToken
            const login = await user.save()
            if (!login) {
                res.status(400).json({
                    message: 'Login Unsuccessful'
                })
            } else {
                res.status(200).json({
                    message: 'Login Successful',
                    data: user
                })
            }
        }
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}



exports.allUsers = async (req, res)=>{
    try {
        const authenticatedUser = await userModel.findById(req.params.id);
        const records = await userModel.find();
        res.status(201).json({
            data: records
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}