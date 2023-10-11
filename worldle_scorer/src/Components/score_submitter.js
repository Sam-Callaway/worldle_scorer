import {useState} from 'react';

function ScoreSubmitter(pastedValue){
    console.log(pastedValue)
}

function scoreParser(pastedValue){
    class worldleObj {constructor(day,attempts,stars,coin,population,fail) {
        this.gameType = "worldle";
        this.day = day;
        this.attempts = attempts;
        this.stars = stars;
        this.coin = coin;
        this.population = population
        this.fail = fail
    }}
    class travleObj {constructor(day,country,greens,oranges,reds,chances,hints,fail){
        this.gameType = "travle";
        this.day = day;
        this.country = country
        this.greens = greens
        this.oranges = oranges
        this.reds = reds
        this.chances = chances
        this.hints = hints
        this.fail = fail
    }}

    class countryleObj {constructor(day,attempts,fail){
        this.gameType = "countryle";
        this.day = day;
        this.attempts = attempts;
        this.fail = fail

    }}
    pastedValue = String(pastedValue)
    if (pastedValue.substring(0,7) === "#Worldle"){
        let day = Number(pastedValue.substring(10,13))
        let attempts = //Add indexOf and substring here
        const gameObj = new worldleObj(day,attempts,stars,coin,population,fail)
    }
    else
        if (pastedValue.substring(0,7) === "#travle "){

        }
        else
            if (pastedValue.substring(0,7) === "#travle_"){

            }
            else
                if((pastedValue.substring(0,9) === "#Countryle")){

                }
                else
                    {return("Not Recognised")}

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

