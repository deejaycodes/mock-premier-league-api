'use strict'
const teamServices = require('../services/TeamServices');
const responseHelper = require('../../libs/responseHelper');
const encryptionManager = require('../../libs/encryption');
const Logger = require('../utils/logger');


class Team{

    //add a team
    async addTeam(req,res){
        let data = req.body
        try {
            const team = await teamServices.addTeam(data)
            await team.save()
            res.status(200).send(responseHelper.success(200, team));
            
        } catch (e) {
            res.status(400).send(responseHelper.error(400, `${e}`))
            
        }
    }

    //remove a team
    async removeTeam(req,res){
        let data = req.params.id;
        try {
            const team = await teamServices.removeTeam(data)
            res.status(200).send(responseHelper.success(200, 'team removed'))

        } catch (error) {
            res.status(400).send(responseHelper.error(400, `${e}`))
        }
    }

    //edit a team,
    async editTeam(req,res){
        let data = req.params.id;
        const updates = Object.keys(req.body)
        const allowedUpdates = ['description','teamMembers', 'teamName']
        const isValidOperations = updates.every((update)=>allowedUpdates.includes(update))
        if(!isValidOperations){
            return res.status(400).send(responseHelper.error(400, 'Invalid updates'))
        }
        try {
            const team = await teamServices.editTeam(data)
            updates.forEach((update)=>{
                team[update] = req.body[update]
            })
            await team.save()
            res.send(team)
            
        } catch (e) {
            res.status(400).send(e)
        }
    }
//view a team

async viewTeam(req,res){
    let data = req.params.id
    try{
        const team  = await teamServices.viewATeam(data)
        if(!team){
            return res.status(400).send({msg:'Team does not exist'})
        }
        res.status(200).send(responseHelper.success(200, team, 'Team found'))

    }catch(e){
            res.status(400).send(responseHelper.error(400, 'Team nt found'))
    }
}













}

const team = new Team;
module.exports = team;