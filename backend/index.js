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

const scoresArray = [
  {
      "gameType": "worldle",
      "day": 637,
      "country": "world",
      "attempts": 1,
      "stars": 3,
      "coin": 1,
      "population": 1,
      "fail": false,
      "player": "sam",
      "score": 380
  },
  {
      "gameType": "travle",
      "day": 310,
      "country": "world",
      "greens": 4,
      "oranges": 1,
      "reds": 1,
      "blacks": 1,
      "chances": 9,
      "hints": 0,
      "fail": false,
      "player": "sam",
      "travleString": "✅🟥🟧⬛✅✅✅",
      "score": 75
  },
  {
      "gameType": "travle",
      "day": 124,
      "country": "gbr",
      "greens": 9,
      "oranges": 1,
      "reds": 0,
      "blacks": 0,
      "chances": 15,
      "hints": 0,
      "fail": false,
      "player": "sam",
      "travleString": "✅✅✅✅🟧✅✅✅✅✅\n",
      "score": 130
  },
  {
      "gameType": "countryle",
      "day": 608,
      "country": "world",
      "attempts": 3,
      "player": "sam",
      "score": 45
  },
  {
    "gameType": "worldle",
    "day": 637,
    "country": "world",
    "attempts": 1,
    "stars": 3,
    "coin": 1,
    "population": 1,
    "fail": false,
    "player": "rory",
    "score": 380
},
{
    "gameType": "travle",
    "day": 310,
    "country": "world",
    "greens": 4,
    "oranges": 1,
    "reds": 1,
    "blacks": 1,
    "chances": 9,
    "hints": 0,
    "fail": false,
    "player": "rory",
    "travleString": "✅🟥🟧⬛✅✅✅",
    "score": 75
},
{
    "gameType": "travle",
    "day": 124,
    "country": "gbr",
    "greens": 9,
    "oranges": 1,
    "reds": 0,
    "blacks": 0,
    "chances": 15,
    "hints": 0,
    "fail": false,
    "player": "rory",
    "travleString": "✅✅✅✅🟧✅✅✅✅✅\n",
    "score": 130
},
{
    "gameType": "countryle",
    "day": 608,
    "country": "world",
    "attempts": 3,
    "player": "rory",
    "score": 45
}
]

app.get('/api/today', (req, res) => {
  res.json(scoresArray)
})
app.get('api//history', (req, res) => {
    res.send('Hello World!')
  })
app.post('api/submit', (req, res) => {
  res.send('Hello World!')
})
app.get('/api/password',(req,res)=>{
    let correctPassword = ''
    const{currentplayer, password} = req.query
    if(currentplayer === 'sam'){
      correctPassword = process.env.SAMPASS;
    } else 
    if (currentplayer === 'rory'){
      correctPassword = process.env.RORYPASS;
    } else {res.send("Player not recognised")}
    if (password === correctPassword){
      res.send("Password good")
    } else {res.send('Password bad')}
})

app.listen(port, () => {
  console.log(`Worldle Scorer back end listening on ${port}`)
})

