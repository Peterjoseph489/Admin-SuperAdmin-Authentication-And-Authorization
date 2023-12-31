const express = require('express');
const {newUser, signIn, userVerify, allUsers, forgotPassword, resetPassword, logOut} = require('../controllers/controller');
const { isSuperAdminAuthorized, isAdminAuthorized } = require('../controllers/authorization')
// const {
//     createRecord,
//     getRecords,
//     getRecord,
//     updateRecord,
//     deleteRecord
// } = require('../controllers/recordController')

const router = express.Router();

router.post('/signup', newUser)
router.put('/userverify/:id', userVerify)
router.post('/login', signIn)
router.post('/logout', logOut)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)
router.get('/records/:id', isAdminAuthorized, allUsers)






// router.post('/records', createRecord)
// router.get('/records/:id', isAdminAuthorized, getRecords)

// router.route('/records/:id')
//     .get(getRecord)
//     .put(updateRecord)
//     .delete(deleteRecord)






module.exports = router