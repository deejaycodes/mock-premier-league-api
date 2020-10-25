const express = require('express')
const router = new express.Router()
const Team = require('../models/teamModel')

//create a new team
router.post('/team/add', async (req,res)=>{
    const team = new Team(req.body)
    try{
        await team.save()
        res.status(201).send({team})
    }catch(e){
        res.status(400).send(e)

    }
})
//delete a team
router.delete('/team/:id',async (req,res)=>{
    const _id = req.params.id
    try{
        const team = await Team.findByIdAndDelete(_id)
        res.status(200).send(team)
    }catch(e){
        res.status(400).send(e)

    }
})

//view a team
router.get('/team/:id', async (req,res)=>{
    const _id = req.params.id
    try{
        const team = await Team.findById(_id)
        res.status(200).send({team})

    }catch(e){
        res.status(400).send(e)

    }
})

//view ALL teams
router.get('/teams/', async (req,res)=>{
    try{
        const teams = await Team.find({})
        res.status(200).send({teams})
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/team/edit/:id', async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['teamName', 'teamMembers', 'description', 'updatedAt']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({ error:"Invalid updates!"})
    }
    try{
        const team = await Team.findById(req.params.id)
        updates.forEach((update)=>team[update] = req.body[update])
            await team.save()
            if(!team){
                res.status(400).send(e)
            }
            res.send(team)
        }
    catch(e){
        res.status(400).send(e)
    }
})
 

module.exports = router