const express = require('express')
require('./database/mongoose')
const userRoute = require('./routes/userRoute')
const teamRoute = require('./routes/teamRoute')
const app = express()

PORT = process.env.PORT || 4000


app.use(express.json())
app.use(userRoute)
app.use(teamRoute)

app.get('/', (req,res)=>{
    res.send({msg: 'Welcome to Mock Spanish League'})
    
})


app.listen(PORT, ()=>{
    console.log(`Server is up on port ${PORT}`)
})