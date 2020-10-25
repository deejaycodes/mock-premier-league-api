const Team = require('../models/teamModel')

class TeamServices{
    async addTeam(data){
        return new Team(data);
    }

    async getTeam(data){
        return Team.findOne(data).exec();
    }

    async editTeam(data){
        return Team.findByIdAndUpdate(data);
    }

    async viewTeam(data){
        return Team.findById(data);
    }

    async removeTeam(data){
        return Team.findByIdAndDelete(data);
    }

}

const teamServices = new TeamServices();
module.exports = teamServices;