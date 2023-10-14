import {useState} from 'react';

const removeDuplicates = (arr, keys) => {
    const set = new Set();
    return arr.filter(obj => {
        const key = keys.map(k => obj[k]).join('|');
        if (!set.has(key)) {
            set.add(key);
            return true;
        }
        return false;
    });
};

function scoreCalc(gameObj){
    let score = 0
    if (gameObj.gameType === "worldle")
        {
            score = 240
            score = score - ((gameObj.attempts-1)*40)
            score = score + (gameObj.stars * 20)
            score = score + (gameObj.population * 10)
            score = score + (gameObj.coin * 10)
        };
    if (gameObj.gameType === "travle")
        {
            if (gameObj.country === 'world')
            {
                score = 50
                score = score + (gameObj.greens * 20)
                score = score - (gameObj.oranges * 5)
                score = score - (gameObj.reds * 10)
                score = score - (gameObj.blacks * 20)
                score = score - (gameObj.hints * 5)
                if(score<0){score = 0}
                if(gameObj.fail === true){score = 0}
            } else
            if (gameObj.country === 'gbr' || gameObj.country === 'irl')
            {
                score = 30
                score = score + (gameObj.greens * 15)
                score = score - (gameObj.oranges * 3)
                score = score - (gameObj.reds * 7)
                score = score - (gameObj.blacks * 15)
                score = score - (gameObj.hints * 3)
                if(score<0){score = 0}
                if(gameObj.fail === true){score = 0}
            }
            else if (gameObj.country === 'usa')
            {
                score = 20
                score = score + (gameObj.greens * 10)
                score = score - (gameObj.oranges * 2)
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



function ScoreSubmitter(pastedValue, player, setWarningShow, scoreUpdater, scoresArray){
    console.log(scoresArray)
    let gameObj = scoreParser(pastedValue, player);
    if (gameObj === 'Not Recognised'){setWarningShow(true); return;}else{setWarningShow(false);};
    gameObj.score = scoreCalc(gameObj);
    let currentArray = scoresArray;
    currentArray.unshift(gameObj);
    removeDuplicates(currentArray,['gameType','day','player','country']);
    scoreUpdater(currentArray);

}



function scoreParser(pastedValue,player){
    let gameObj;
    // possibly remove these constructors and move creating objects into ifs
    class worldleObj {constructor(day,attempts,stars,coin,population,fail,player) {
        this.gameType = "worldle";
        this.day = day;
        this.country = null;
        this.attempts = attempts;
        this.stars = stars;
        this.coin = coin;
        this.population = population;
        this.fail = fail;
        this.player = player;
    }}
    class travleObj {constructor(day,country,greens,oranges,reds,blacks,chances,hints,fail,player){
        this.gameType = "travle";
        this.day = day;
        this.country = country;
        this.greens = greens;
        this.oranges = oranges;
        this.reds = reds;
        this.blacks = blacks;
        this.chances = chances;
        this.hints = hints;
        this.fail = fail;
        this.player = player;
    }}

    class countryleObj {constructor(day,attempts,player){
        this.gameType = "countryle";
        this.day = day;
        this.country = null;
        this.attempts = attempts;
        this.player = player;

    }}
    pastedValue = String(pastedValue)
    // Parsing for Worldle scores
    if (pastedValue.substring(0,8) === "#Worldle"){
        let attempts;
        let fail = false;
        let day = Number(pastedValue.substring(10,13));
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
            let greens = Number((pastedValue.match(/\u{2705}/gu)||[]).length);
            let oranges = Number((pastedValue.match(/\u{1F7E7}/gu)||[]).length);
            let reds = Number((pastedValue.match(/\u{1F7E5}/gu)||[]).length);
            let blacks = Number((pastedValue.match(/\u{2B1B}/gu)||[]).length);
            let chances = Number(pastedValue.substring((pastedValue.indexOf('/')+1),(pastedValue.lastIndexOf('(')-2)));
            let hints = Number(pastedValue.substring((pastedValue.indexOf('hint')-2),(pastedValue.indexOf('hint')-1)));
            gameObj = new travleObj(day,country,greens,oranges,reds,blacks,chances,hints,fail,player)
        }
        else
            // Parsing for countryle scores
                if(pastedValue.substring(0,10) === "#Countryle"){
                    let day = Number(pastedValue.substring((pastedValue.indexOf(' ')+1),(pastedValue.lastindexOf('Guess')-1)))
                    let attempts = Number(pastedValue.substring((pastedValue.indexOf('Guessed in')+11),(pastedValue.indexOf('tries')-1)))
                    gameObj = new countryleObj(day,attempts,player)
                }
                else
                    {return("Not Recognised")}

    return (gameObj)

}

function ScorePaster(props){
    const [postContent, setPostContent] = useState('');
    const [warningShow, setWarningShow] = useState(false);

    let warning = '';
    if(warningShow === true){warning = "Not recognised. Please paste scores directly from Worldle, Travle or Countryle"}
    
    return (
        <div>
        <div>{warning}</div>
        <label>
            Paste your scores:
            <textarea value={postContent} onInput={e => ScoreSubmitter(e.target.value, props.player, setWarningShow, props.scoreUpdater, props.scoresArray) + setPostContent('')} name="pasteScores" rows={4} cols={40}></textarea>
        </label>
        </div>
    )
    
}

export default ScorePaster;

