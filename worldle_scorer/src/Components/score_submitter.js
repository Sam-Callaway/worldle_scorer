import {useState} from 'react';
import axios from 'axios';

const today = new Date().setHours(0,0,0,0);
const zeroDate = new Date('2023-10-19').setHours(0,0,0,0)
const timeDifference = today - zeroDate;
const dayDifference = timeDifference / (1000 * 60 * 60 * 24);
const worldleDay = 636 + dayDifference
const travleDay = 309 + dayDifference
const travleCountryDay = 123 + dayDifference
const countryleDay = 607 + dayDifference


function scoreCalc(gameObj){
    let score = 0
    if (gameObj.gameType === "worldle")
        {
            score = 300
            score = score - ((gameObj.attempts-1)*50)
            score = score + (gameObj.stars * 20)
            score = score + (gameObj.population * 10)
            score = score + (gameObj.coin * 10)
        };
    if (gameObj.gameType === "travle")
        { let attempts = gameObj.greens+gameObj.oranges+gameObj.reds+gameObj.blacks
            if (gameObj.country === 'world')
            {
                score = 50
                if ((gameObj.oranges+gameObj.reds+gameObj.blacks) === 0){score = score + 50}
                score = score + ((gameObj.chances - attempts)*30)
                score = score - (gameObj.reds * 10)
                score = score - (gameObj.blacks * 25)
                score = score - (gameObj.hints * 5)
                if(score<0){score = 0}
                if(gameObj.fail === true){score = 0}
            } else
            if (gameObj.country === 'gbr' || gameObj.country === 'irl')
            {
                score = 30
                if ((gameObj.oranges+gameObj.reds+gameObj.blacks) === 0){score = score + 30}
                score = score + ((gameObj.chances - attempts)*20)
                score = score - (gameObj.reds * 7)
                score = score - (gameObj.blacks * 15)
                score = score - (gameObj.hints * 3)
                if(score<0){score = 0}
                if(gameObj.fail === true){score = 0}
            }
            else if (gameObj.country === 'usa')
            {
                score = 20
                if ((gameObj.oranges+gameObj.reds+gameObj.blacks) === 0){score = score + 20}
                score = score + ((gameObj.chances - attempts)*12)
                score = score - (gameObj.reds * 5)
                score = score - (gameObj.blacks * 10)
                score = score - (gameObj.hints * 2)
                if(score<0){score = 0}
                if(gameObj.fail === true){score = 0}
            } else {score = 0}
        };
    if (gameObj.gameType === "countryle")
        {
            if (gameObj.attempts === 1){score = 1000} else 
            {
                score = 50 - ((gameObj.attempts - 2 )*5)
                if (score < 0){score = 0}
            }
        };
    return (score);
}

const submitScoresAPI = async(gameObj,player,password) => {
    const url = 'http://localhost:4000/api/submit'
    const data = {
        gameObj:gameObj,
        player:player,
        password:password
    }
    
    try{
        console.log(data)
        const response = await axios.post(url,data)
        console.log('Status:', response.status);
        console.log('Body:', response.data);
    } catch (error){
        console.error('Error:',error)
    }
}

function ScoreSubmitter(pastedValue, player, masterPassword, setWarning, scoreUpdater, scoresArray){
    let gameObj = scoreParser(pastedValue, player);
    if (gameObj === 'Not Recognised'){setWarning('Not recognised. Please paste scores directly from Worldle, Travle or Countryle'); return;}
    else
    if (gameObj === 'Wrong Day'){setWarning('This is not today\'s game!'); return;}
    else {setWarning('')};
    gameObj.score = scoreCalc(gameObj);
    if (player !== 'test'){submitScoresAPI(gameObj,player,masterPassword);}
    let currentArray = scoresArray;
    currentArray.unshift(gameObj);
    let stringValues = [];
    let currentArrayUnique = [];
    for (let obj of currentArray){
        let stringValue = String(obj.gameType+obj.day+obj.country+obj.player);
        if (!stringValues.includes(stringValue)){stringValues.push(stringValue);currentArrayUnique.unshift(obj);}
    }
    scoreUpdater(currentArrayUnique);
}


function scoreParser(pastedValue,player){
    let gameObj;
    class worldleObj {constructor(day,attempts,stars,coin,population,fail,player) {
        this.gameType = "worldle";
        this.day = day;
        this.country = 'world';
        this.attempts = attempts;
        this.stars = stars;
        this.coin = coin;
        this.population = population;
        this.fail = fail;
        this.player = player;
    }}
    class travleObj {constructor(day,country,greens,oranges,reds,blacks,attempts,chances,hints,fail,player,travleString){
        this.gameType = "travle";
        this.day = day;
        this.country = country;
        this.greens = greens;
        this.oranges = oranges;
        this.reds = reds;
        this.blacks = blacks;
        this.attempts = attempts;
        this.chances = chances;
        this.hints = hints;
        this.fail = fail;
        this.player = player;
        this.travleString = travleString;
    }}

    class countryleObj {constructor(day,attempts,player){
        this.gameType = "countryle";
        this.day = day;
        this.country = 'world';
        this.attempts = attempts;
        this.player = player;

    }}
    pastedValue = String(pastedValue)
    // Parsing for Worldle scores
    if (pastedValue.substring(0,8) === "#Worldle"){
        let attempts;
        let fail = false;
        let day = Number(pastedValue.substring(10,13));
        if(day !== worldleDay){return("Wrong Day")}
        if ((pastedValue.substring((pastedValue.indexOf('/')-1),(pastedValue.indexOf('/')))) === 'X'){
            fail = true;
            attempts = 7;

        } else {
                attempts = Number(pastedValue.substring((pastedValue.indexOf('/')-1),(pastedValue.indexOf('/'))));
        }
        let stars = (pastedValue.match(/\u{2B50}/gu)||[]).length;
        let coin = (pastedValue.match(/\u{1FA99}/gu)||[]).length;
        let population = (pastedValue.match(/\u{1F3D9}/gu)||[]).length;
        gameObj = new worldleObj(day,attempts,stars,coin,population,fail,player)

    }
    else
    // Parsing for travle scores
        if (pastedValue.substring(0,7) === '#travle'){
            let country = '';
            let fail = false
            if ((pastedValue.substring((pastedValue.indexOf('/')-1),(pastedValue.indexOf('/')))) === '?'){
                fail = true;   
            }
            let day = Number(pastedValue.substring((pastedValue.lastIndexOf('#')+1),pastedValue.indexOf('(')-1))
            if(pastedValue.substring(7,8) === '_'){
                country = pastedValue.substring((pastedValue.indexOf('_')+1),pastedValue.indexOf(' '))
            } else {country = 'world'}
            if(day !== travleDay && country === 'world'){return("Wrong Day")}
            if(day !== travleCountryDay && (country === 'usa' || country === 'gbr' || country === 'irl')){return("Wrong Day")}
            let greens = Number((pastedValue.match(/\u{2705}/gu)||[]).length);
            let oranges = Number((pastedValue.match(/\u{1F7E7}/gu)||[]).length);
            let reds = Number((pastedValue.match(/\u{1F7E5}/gu)||[]).length);
            let blacks = Number((pastedValue.match(/\u{2B1B}/gu)||[]).length);
            let attempts = greens+oranges+reds+blacks
            let chances = Number(pastedValue.substring((pastedValue.indexOf('/')+1),(pastedValue.lastIndexOf('(')-2)));
            let hints = Number(pastedValue.substring((pastedValue.indexOf('hint')-2),(pastedValue.indexOf('hint')-1)));
            let travleString = pastedValue.substring((pastedValue.indexOf('hint')+7),(pastedValue.indexOf('https')))
            gameObj = new travleObj(day,country,greens,oranges,reds,blacks,attempts,chances,hints,fail,player,travleString)
        }
        else
            // Parsing for countryle scores
                if(pastedValue.substring(0,10) === "#Countryle"){
                    let day = Number(pastedValue.substring((pastedValue.indexOf(' ')+1),(pastedValue.lastIndexOf('Guess')-1)))
                    if(day !== countryleDay){return("Wrong Day")}
                    let attempts = Number(pastedValue.substring((pastedValue.indexOf('Guessed in')+11),(pastedValue.indexOf('tries')-1)))
                    gameObj = new countryleObj(day,attempts,player)
                }
                else
                    {return("Not Recognised")}

    return (gameObj)

}

function ScorePaster(props){
    const [postContent, setPostContent] = useState('');
    const [warning, setWarning] = useState('');

    
       
    return (
        <div>
        <div>{warning}</div>
        <label id='scorePasting'>
            Paste your scores:
            <textarea value={postContent} onInput={e => ScoreSubmitter(e.target.value, props.player, props.masterPassword, setWarning, props.scoreUpdater, props.scoresArray) + setPostContent('')} name="pasteScores" rows={4} cols={40}></textarea>
        </label>
        </div>
    )
    
}

export default ScorePaster;

