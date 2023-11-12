const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config()

let today = new Date().setHours(0,0,0,0);

//'2023-10-19'
const zeroDate = new Date('2023-10-19').setHours(0,0,0,0)
const timeDifference = today - zeroDate;
const dayDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
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

const totalsSchema = new mongoose.Schema({
  date:Date,
  sam:Number,
  rory:Number
})

const Totals = mongoose.model('Totals',totalsSchema);
const Scores = mongoose.model('Scores', scoreSchema);

async function saveYesterdayTotalScore(){
  console.log("saving yesterdays scores")
  let scoresArray = []
  let yesterday = new Date();
  yesterday.setDate(yesterday.getDate()-1);
  yesterday.setHours(0,0,0,0);

  try {
    console.log("retrieving yesterdays worldle scores")
    const worldles = await Scores.find({ gameType: 'worldle', day: (worldleDay-1) });
    try {
      console.log("retrieving yesterdays travle scores")
      const travles = await Scores.find({gameType:'travle', country:'world', day:(travleDay-1)});
      try {
        console.log("retrieving yesterdays travle country scores")
        const travlecountrys = await Scores.find({gameType:'travle', country:{$ne:'world'}, day:(travleCountryDay-1)});
        try {
          console.log("retrieving yesterdays countryle scores")
          const countryles = await Scores.find({gameType:'countryle', day:(countryleDay-1)});
          console.log("all scores retrieved")
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
  let samTotal = 0
  let roryTotal = 0
  for (gameObj of scoresArray){
      if (gameObj.player === 'sam'){
        samTotal = samTotal + gameObj.score;
      }
      if (gameObj.player === 'rory'){
        roryTotal = roryTotal + gameObj.score;
      }
  }
  try {
    await Totals.deleteMany({date:yesterday});
    console.log('Deleted duplicate totals');
  } catch (err) {
    console.error(err);
  }


  let saveGame = new Totals({
    date:yesterday,
    sam:samTotal,
    rory:roryTotal
  })
  console.log(saveGame)
  try{
   await saveGame.save()
  } catch(err){console.error(err)}
}

saveYesterdayTotalScore();


// I ping this with a cron job to keep the server awake
// The update day function seems to have some issues so I stop pinging for an hour at 2AM and then Render will stop the service for inactivity.
// That will prompt a reset when it's pinged again at 3AM and move the day forwards
app.get('/hello/hello', (req, res) => {
  res.send('Hello World!')
  console.log('Hello I am awake')
})


app.get('/api/today', async (req, res) => {
  console.log('scores requested')
  let scoresArray = await todayScores();
  res.send(scoresArray)
})

async function todayScores(){
  let scoresArray = []

  try {
    const worldles = await Scores.find({gameType: 'worldle', day: worldleDay });
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

async function last30Scores(){
  let scoresArray = []

  try {
    const worldles = await Scores.find({gameType: 'worldle', day: {$gte:(worldleDay-30), $lt:worldleDay} });
    try {
      const travles = await Scores.find({gameType:'travle', country:'world', day:{$gte:(travleDay-30), $lt:travleDay}});
      try {
        const travlecountrys = await Scores.find({gameType:'travle', country:{$ne:'world'}, day:{$gte:(travleCountryDay-30), $lt:travleCountryDay}});
        try {
          const countryles = await Scores.find({gameType:'countryle', day:{$gte:(countryleDay-30), $lt:countryleDay}});
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




app.get('/api/history', async (req, res) => {
    let scoresArray = await last30Scores();


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

// Change over to de localise

app.listen(process.env.PORT, () => {
  console.log(`Worldle Scorer back end listening on ${process.env.PORT}`)
})

// app.listen(4000, () => {
//   console.log(`Worldle Scorer back end listening on 4000`)
// })




