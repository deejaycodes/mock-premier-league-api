const express = require('express');
const userController = require('../controllers/UserController')
const auth = require('../middlewares/auth')
const router = express.Router();




//Sign up user
router.post('/signup', (req, res) => {
    userController.signUp(req, res);
});

//login user
router.post('/login', (req,res)=>{
    userController.logIn(req,res);
});

//logout user
router.post('/logout', auth, (req,res)=>{
    userController.logOut(req,res);
});


router.get('users/me', auth, (req,res)=>{
    userController.viewUser(req,res)
})



module.exports = router;