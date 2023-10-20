

function ScoreRender(props){
    let thisPlayer = ''
    if (props.player === 'sam'){thisPlayer = 'Sam'};
    if (props.player === 'rory'){thisPlayer = 'Rory'};
    let totalScore = 0;
    for (let obj of props.scoresArray){
        if (obj.player === props.player){totalScore = totalScore + obj.score}
    }
    return (
        <div className="gamelist">
        <div>
            {props.scoresArray.map(gameObj => (createScoreCard(gameObj, props.player)))}
        </div>
        <div className='total-points'>Total Points:{totalScore}</div>
        <div className='total-points'>{thisPlayer}</div>
        </div>
    )
}

const coinEmojiCharacter = String.fromCodePoint(0x1FA99)
const populationEmojiCharacter = String.fromCodePoint(0x1F3D9)

function createScoreCard(gameObj, player){
    let key = String(gameObj.gametype)+String(gameObj.day)+String(gameObj.country)+String(gameObj.player)
    if (gameObj.player === player){
    if (gameObj.gameType === 'worldle'){
        let starsEmoji = '';
        let populationEmoji = '';
        let coinEmoji = '';
        let attemptsMessage = '';
        if (gameObj.fail === true){attemptsMessage = "Failed!"}else{attemptsMessage = 'Found in '+gameObj.attempts+'/6'}
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
                </div>
                <div className='gamecard-title-area'>
                <div className='gamecard-content-area'> 
                <h3 className='gamecard-emoji' id="stars">{starsEmoji}</h3>
                <h3 className='gamecard-emoji' id="population">{populationEmoji}</h3>
                <h3 className='gamecard-emoji' id="currency">{coinEmoji}</h3>
                </div>
                <h3 className='gamecard-content'>{gameObj.score} Points</h3>
                </div>
            </div>
    )}
    if (gameObj.gameType === 'travle'){
        let travleCountry=''
        if(gameObj.country !== 'world'){travleCountry = '_'+gameObj.country}
        let totalGuesses = gameObj.greens+gameObj.oranges+gameObj.reds+gameObj.blacks;
        let hintsString = ''
        if (gameObj.hints > 0){hintsString = gameObj.hints+' hints'}
        if (gameObj.fail === true){totalGuesses = 'X'}
        return(
            <div key={key} className="gamecard">
                <div className='gamecard-title-area'>
                <h2 className='gamecard-content' id="gametype">Travle{travleCountry}</h2>
                <h2 className='gamecard-content' id="day">Day: {gameObj.day}</h2>
                </div>
                <div className='gamecard-title-area'>
                <h2 className='travle-string'>{gameObj.travleString}</h2>
                
                </div>
                <div className='gamecard-title-area'> 
                <h2 className='gamecard-content'>{totalGuesses}/{gameObj.chances}</h2>
                <h3 id='travle-hints' className='gamecard-content'>{hintsString}</h3>
                <h3 className='gamecard-content'>{gameObj.score} Points</h3>
                </div>
            
            </div>
    )}
    if (gameObj.gameType === 'countryle'){
        return(
            <div key={key} className="gamecard">
                <div className='gamecard-title-area'>
                <h2 className='gamecard-content'>Countryle</h2>
                <h2 className='gamecard-content' id="day">Day: {gameObj.day}</h2>
                </div>                
                <h3 className='gamecard-content' id="attempts">Found in {gameObj.attempts} guesses</h3>
                <h3 className='countryle-points'>{gameObj.score} Points</h3>
                
            </div>
    )} 
        }
}

export default ScoreRender;