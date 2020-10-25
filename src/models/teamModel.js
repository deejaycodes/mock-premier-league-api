const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    teamName:{
        type: String,
        unique: true,
        required: true,
        enum: ['AFC Bournemouth', 'Arsenal', 'Aston Villa', 'Brighton & Hove Albion', 'Burnley', 'Chelsea',
            'Crystal Palace', 'Everton', 'Leicester City', 'Liverpool', 'Manchester City', 'Manchester United',
            'Newcastle United', ' Norwich City', 'Sheffield United', 'Southampton', 'Tottenham Hotspur', 'Watford',
            'West Ham United', 'Wolverhampton Wanderers']
    },
    
    teamMembers:{
        type:Array,
        name:{
            type:String,
            lowercase:true,
            rquired:true
        },
        role:{
            type:String,
            required:true,
            enum: ['Goal Keeper', 'Central Back', 'Central Midfield', 'Central Forward', 'Left Wing', 'Attacking Midfield',
             'Central Forward', 'Left Midfielder', 'Striker', 'Defending', 'Right Midfielder']
        }
    },
    description:String
}, {
    timestamps: true
})





const Team = mongoose.model('Team', teamSchema)
module.exports = Team