const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config()

let today = new Date().setHours(0,0,0,0);

function updateDay(){
setTimeout(() => {
  today = new Date().setHours(0,0,0,0); updateDay();},60000);
}

updateDay();
const zeroDate = new Date('2023-10-19').setHours(0,0,0,0)
const timeDifference = today - zeroDate;
const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
const worldleDay = 636 + dayDifference
const travleDay = 309 + dayDifference
const travleCountryDay = 123 + dayDifference
const countryleDay = 607 + dayDifference

const mongoPassword = process.env.MONGODBPASSWORD;
const url = 'mongodb+srv://calls002:'+mongoPassword+'@cluster0.iraeblh.mongodb.net/WorldleScorer?retryWrites=true&w=majority';

mongoose.connect(url)
const db = mongoose.connection;

const scoreSchema = new mongoose.Schema({
  gameType:String,
  day:Number,
  country:String,
  attempts:Number,
  greens:Number,
  oranges:Number,
  reds:Number,
  blacks:Number,
  chances:Number,
  stars:Number,
  coin:Number,
  population:Number,
  fail:Boolean,
  player:String,
  travleString:String,
  score:Number
})

const Scores = mongoose.model('Scores', scoreSchema);



app.get('/api/today', async (req, res) => {
  
  let scoresArray = await todayScores();
  res.send(scoresArray)
})

async function todayScores(){
  let scoresArray = []

  try {
    const worldles = await Scores.find({ gameType: 'worldle', day: worldleDay });
    try {
      const travles = await Scores.find({gameType:'travle', country:'world', day:travleDay});
      try {
        const travlecountrys = await Scores.find({gameType:'travle', country:{$ne:'world'}, day:travleCountryDay});
        try {
          const countryles = await Scores.find({gameType:'countryle', day:countryleDay});
          for (let obj of worldles){
            scoresArray.push(obj)
          }
          for (let obj of travles){
            scoresArray.push(obj)
          }
          for (let obj of travlecountrys){
            scoresArray.push(obj)
          }
          for (let obj of countryles){
            scoresArray.push(obj)
          }
          return(scoresArray);
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error(err);
    }
  } catch (err) {
    console.error(err);
  }

  

}


app.get('/api/history', (req, res) => {
    res.send('Hello World!')
  })

app.post('/api/submit', async (req, res) => {
  
  let gameObj = req.body.gameObj
  let player = req.body.player
  let password = req.body.password
  let correctPassword = ''
  if (player === 'sam'){correctPassword = process.env.SAMPASS;} else if (player === 'rory'){correctPassword = process.env.RORYPASS;} else {res.send("Player not recognised")}
  if (password === correctPassword){
    if (gameObj.player !== player){res.send('Player Mismatch')}
    try {
      await Scores.deleteMany({ gameType:gameObj.gameType, day:gameObj.day, country:gameObj.country, player:gameObj.player});
      console.log('Duplicates deleted successfully');
    } catch (err) {
      console.error(err);
    }
    if(gameObj.gameType === 'worldle'){
      let saveGame = new Scores({
        gameType:gameObj.gameType,
        day:gameObj.day,
        country:gameObj.country,
        attempts:gameObj.attempts,
        stars:gameObj.stars,
        coin:gameObj.coin,
        population:gameObj.population,
        fail:gameObj.fail,
        player:gameObj.player,
        score:gameObj.score
      })
      try {
        await saveGame.save()
        console.log("game saved")
      } catch (err) {console.error(err);}
    }
    if(gameObj.gameType === 'travle'){
      let saveGame = new Scores({
        gameType:gameObj.gameType,
        day:gameObj.day,
        country:gameObj.country,
        attempts:gameObj.attempts,
        greens:gameObj.greens,
        oranges:gameObj.oranges,
        reds:gameObj.reds,
        blacks:gameObj.blacks,
        chances:gameObj.chances,
        fail:gameObj.fail,
        player:gameObj.player,
        travleString:gameObj.travleString,
        score:gameObj.score
      })
      try {
        await saveGame.save()
        console.log("game saved")
      } catch (err) {console.error(err);}
    }
    if(gameObj.gameType === 'countryle'){
      let saveGame = new Scores({
        gameType:gameObj.gameType,
        day:gameObj.day,
        country:gameObj.country,
        attempts:gameObj.attempts,
        player:gameObj.player,
        score:gameObj.score
      })
      try {
        await saveGame.save()
        console.log("game saved")
      } catch (err) {console.error(err);}
    }

  
  } else {res.send('Incorrect Password')}
  
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

app.listen(process.env.PORT, () => {
  console.log(`Worldle Scorer back end listening on ${process.env.PORT}`)
})




