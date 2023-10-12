import {useState} from 'react';

function ScoreSubmitter(pastedValue){
    let gameObj = scoreParser(pastedValue)
    

}

function scoreParser(pastedValue){
    let gameObj;
    class worldleObj {constructor(day,attempts,stars,coin,population,fail) {
        this.gameType = "worldle";
        this.day = day;
        this.attempts = attempts;
        this.stars = stars;
        this.coin = coin;
        this.population = population;
        this.fail = fail;
    }}
    class travleObj {constructor(day,country,greens,oranges,reds,blacks,chances,hints,fail){
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
    }}

    class countryleObj {constructor(day,attempts){
        this.gameType = "countryle";
        this.day = day;
        this.attempts = attempts;

    }}
    pastedValue = String(pastedValue)
    // Parsing for Worldle scores
    if (pastedValue.substring(0,8) === "#Worldle"){
        let attempts;
        let fail = false;
        let day = Number(pastedValue.substring(10,13));
        if ((pastedValue.substring((pastedValue.indexOf('/')-1),(pastedValue.indexOf('/')))) === 'X'){
            fail = true;
            attempts = 10;

        } else {
                attempts = Number(pastedValue.substring((pastedValue.indexOf('/')-1),(pastedValue.indexOf('/'))));
        }
        let stars = (pastedValue.match(/\u{2B50}/gu)||[]).length;
        let coin = (pastedValue.match(/\u{1FA99}/gu)||[]).length;
        let population = (pastedValue.match(/\u{1F3D9}/gu)||[]).length;
        gameObj = new worldleObj(day,attempts,stars,coin,population,fail)
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
            let chances = Number(pastedValue.substring((pastedValue.indexOf('/')+1),(pastedValue.indexOf('/')+2)));
            let hints = Number(pastedValue.substring((pastedValue.indexOf('hint')-2),(pastedValue.indexOf('hint')-1)));
            gameObj = new travleObj(day,country,greens,oranges,reds,blacks,chances,hints,fail)
        }
        else
            // Parsing for countryle scores
                if(pastedValue.substring(0,10) === "#Countryle"){
                    let day = Number(pastedValue.substring((pastedValue.indexOf(' ')+1),(pastedValue.indexOf('Guess')-1)))
                    let attempts = Number(pastedValue.substring((pastedValue.indexOf('Guessed in')+11),(pastedValue.indexOf('tries')-1)))
                    gameObj = new countryleObj(day,attempts)
                }
                else
                    {return("Not Recognised")}
    return (gameObj)

}

function ScorePaster(){
    const [postContent, setPostContent] = useState('');
    
    
    return (
        <label>
            Paste your scores:
            <textarea value={postContent} onInput={e => ScoreSubmitter(e.target.value) + setPostContent('')} name="pasteScores" rows={4} cols={40}></textarea>
        </label>
    )
    
}

export default ScorePaster;

