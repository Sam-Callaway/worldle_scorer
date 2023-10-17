function ScoreRender(props){
    

    
    return (
        <div className="gamelist">
            {props.scoresArray.map(gameObj => (createScoreCard(gameObj, props.player)))}
        </div>
    )
}

function createScoreCard(gameObj, player){
    if (gameObj.player === player){
    if (gameObj.gameType === 'worldle'){
        let starsEmoji = '';
        for (let i = 0; i < gameObj.stars; i++){starsEmoji+='\u2B50';};
        return(
            <div className="gamecard">
                <h2 id="gametype">Worldle</h2>
                <h3 id="day">Day: {gameObj.day}</h3>
                <h3 id="attempts">{gameObj.attempts}/6</h3>
                <h3 id="stars">{starsEmoji}</h3>


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