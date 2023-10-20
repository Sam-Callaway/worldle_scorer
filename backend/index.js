const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express()
const port = 4000
app.use(cors());
require('dotenv').config()

const mongoPassword = process.env.MONGODBPASSWORD;
const url = 'mongodb+srv://calls002:'+mongoPassword+'@cluster0.iraeblh.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(url)


app.get('/today', (req, res) => {
  res.send('Hello World!')
})
app.get('/history', (req, res) => {
    res.send('Hello World!')
  })
app.post('/today', (req, res) => {
  res.send('Hello World!')
})
app.get('/api/password',(req,res)=>{
    let correctPassword = ''
    const{currentplayer, password} = req.query
    console.log(currentplayer)
    console.log(password)
    if(currentplayer === 'sam'){
      correctPassword = 'hello123'
    } else 
    if (currentplayer === 'rory'){
      correctPassword = 'hello123'
    } else {res.send("Player not recognised")}
    if (password === correctPassword){
      res.send("Password good")
    } else {res.send('Password bad')}
})

app.listen(port, () => {
  console.log(`Worldle Scorer back end listening on ${port}`)
})

