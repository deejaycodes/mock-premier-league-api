'use strict'
const userServices = require('../services/UserServices');
const responseHelper = require('../../libs/responseHelper');
const encryptionManager = require('../../libs/encryption');
//const Logger = require('../../utils/logger');



class User{
        /**
        * @description A user can signup with the right data in the body.
        * @param {Object} req - Http Request object
        * @param {Object} res - Http Request object
        * @returns {Object} returns object of the required response
        */

     async signUp(req,res){
        let data = req.body;
        try {
        //check if user exist already
        const userExist = await userServices.getUser({ email : data.email });
        if(userExist){
            return res.status(400).send(responseHelper.error(400, 'Email already registered'));
        }
        const param = {
            email: data.email,
            firstName:data.firstName,
            lastName: data.lastName,
            password: data.password,
            isAdmin:data.isAdmin
        }
        const user = await userServices.createUser(param);
        await user.generateToken();
        await user.save();
        res.status(201).send(responseHelper.success(201, user, 'user created successfully'))
    } catch (e) {
        res.status(400).send(responseHelper.error(400, 'Request declined'))
        }

    }

    async logIn(req,res){
        const { email, password } = req.body;
        if(!email||!password){
            return res
            .status(400)
            .send(responseHelper.error(400, 'Email & password required'))
        }
        try {
            //check if user exists
            const user = await userServices.getUser({email})
            if(user){
                if(encryptionManager.compareHashed(password, user.password)){
                    await user.generateToken()
                    return res.status(200).send(responseHelper.success(200, user))

                }else{
                    return res
                    .status(400)
                    .send(responseHelper.error(400, 'Incorrect password'))
                    
                }

            }else{
                return res
                .status(400)
                .send(responseHelper.error(400, 'User not found'))
            }
            
        } catch (e) {
             res.status(500).send(responsesHelper.error(500, `${error}`));
            
        }

    }
    async logOut(req,res){
        try {
            req.user.tokens = req.user.tokens.filter((element)=>{
                return element.token !== req.token;
            });
            await req.user.save();
            res
            .status(200)
            .send(responseHelper.success(200, 'User logged out successfully'))
            
        } catch (e) {
             res.status(500).send(responsesHelper.error(500, `${error}`));
            
        }
    }
    
    async viewUser(req,res){
        try {
            res.status(200).send(responseHelper.success(req.user))
        } catch (error) {
             res.status(500).send(responsesHelper.error(500, `${error}`));
        }
    }







}

const user = new User();
module.exports = user;