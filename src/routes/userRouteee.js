// const express = require('express')
// const User = require('../models/userModel')
// const router = new express.Router()



//user sign up
router.post('/user/signup', async (req,res)=>{
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateToken()
       
        if(user){
            res.status(201).send({ user, token})
        }
        
    }catch(e){
        res.status(400).send(e)

    }
})

//user login
router.post('/user/login', async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateToken()
            res.status(200).send({ user, token })

    }catch(e){
        res.status(404).send(e)

    }
})

//view user profile
router.get('/user/:id', async (req,res)=>{
    const _id = req.params.id
    try{
        const user = await User.findById(_id)
        if(!user){
            res.status(404).send(e)

        }
        res.send(user)
    }catch(e){
        res.status(404).send({msg:'user not found!'})

    }
})

//view ALL users
router.get('/users/all', async (req,res)=>{
    try{
        const users = await User.find({})
        res.status(200).send({users})

    }catch(e){
        res.status(404).send(e)

    }
})

//delete a user
router.delete('/user/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findByIdAndDelete(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})















module.exports = router