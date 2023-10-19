function ScoreRender(props){
    

    
    return (
        <div className="gamelist">
            {props.scoresArray.map(gameObj => (createScoreCard(gameObj, props.player)))}
        </div>
    )
}

const coinEmojiCharacter = String.fromCodePoint(0x1FA99)
const populationEmojiCharacter = String.fromCodePoint(0x1F3D9)

function createScoreCard(gameObj, player){
    let key = gameObj.gametype+gameObj.day+gameObj.country+gameObj.player
    if (gameObj.player === player){
    if (gameObj.gameType === 'worldle'){
        let starsEmoji = '';
        let populationEmoji = '';
        let coinEmoji = '';
        let attemptsMessage = '';
        if (gameObj.fail === true){attemptsMessage = "Failed to find!"}else{attemptsMessage = 'Found in '+gameObj.attempts+'/6'}
        for (let i = 0; i < gameObj.stars; i++){starsEmoji+='\u2B50';};
        if (gameObj.population === 1){populationEmoji+=populationEmojiCharacter};
        if (gameObj.coin === 1){coinEmoji+=coinEmojiCharacter};
        return(
            <div key={key} className="gamecard">
                <div className='gamecard-title-area'>
                <h2 className='gamecard-content' id="gametype">Worldle</h2>
                <h2 className='gamecard-content' id="day">Day: {gameObj.day}</h2>
                </div>
                <div className='gamecard-title-area'>                            
                <h3 className='gamecard-content' id="attempts">{attemptsMessage}</h3>
                <h3 className='gamecard-content'>{gameObj.score} Points</h3>
                </div>
                <div className='gamecard-content-area'> 
                <h3 className='gamecard-content' id="stars">{starsEmoji}</h3>
                <h3 className='gamecard-content' id="population">{populationEmoji}</h3>
                <h3 className='gamecard-content' id="currency">{coinEmoji}</h3>
                </div>
            </div>
    )}
    if (gameObj.gameType === 'travle'){
        return(
            <div className="gamecard">
                <h2 id="gametype">Travle</h2>
            </div>
    )}
    if (gameObj.gameType === 'countryle'){
        return(
            <div className="gamecard">
                <h2 id="gametype">Countryle</h2>
            </div>
    )} 
        }
}

export default ScoreRender;