const Fixture = require('../models/fixtureModel')
const Fixture = require('../models/fixtureModel')

class FixtureServices{
    async addFixture(data){
        return new Fixture(data);
    }

    async editFixture(data){
        return Fixture.findByIdAndUpdate(data);
    }

    async viewFixture(data){
        return Fixture.findById(data);
    }

    async viewAllFixtures(data){
        return Fixture.find({})
    }
    

    async removeFixture(data){
        return Fixture.findByIdAndDelete(data)
    }


}

const fixtureServices = new FixtureServices;
module.exports = fixtureServices