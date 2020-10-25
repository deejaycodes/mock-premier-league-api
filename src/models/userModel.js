const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    email:{ type:String, required:true,unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }},
    password:{type:String, required:true},
    firstName:String,
    lastName:String,
    isAdmin:{type:Boolean, default:false},
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],

}, {timestamps: true})



//generate Token
userSchema.methods.generateToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'secretkey')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


//find user by credentials
userSchema.statics.findByCredentials = async (email, password) =>{
    const user = await User.findOne({ email })
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user

}

//hash password before saving it
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password =await bcrypt.hash(user.password,8)
       
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User