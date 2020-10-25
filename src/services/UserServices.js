const User = require('../models/userModel')

class UserServices{
    //Get a user with the fileds passed in
    async getUser(data){
        return User.findOne(data).exec();
    }

    //Create a new user object
    async createUser(data){
        return new User(data);
    }

    //Read user profile
    async viewUser(data){
        return User.findById(data)
    }
    
    //A mongoose methid that verifies user's cedentials
    async verifyUser(email,password){
        return verifyDetails(email,password)
    }


}

const userServices = new UserServices();
module.exports = userServices;
