const express = require('express');
const router = express.Router();
const teamController = require('../controllers/TeamController')
//const auth = require('../middlewares/auth')


router.post('/team/add/', (req, res) => {
    teamController.addTeam(req, res);
});

router.delete('/team/:id/', (req,res)=>{
    teamController.removeTeam(req,res)
});

router.patch('/team/:id', (req,res)=>{
    teamController.editTeam(req,res)
})

router.get('/team/:id', (req,res)=>{
    teamController.viewTeam(req,res)
})









module.exports = router;