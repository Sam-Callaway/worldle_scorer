function ScoreRender(scoresArray,player){
    
    
    
    return (
        <div className="gamelist">
            {scoresArray.map(gameObj => (createScoreCard()))}
        </div>
    )
}

function createScoreCard(gameObj){
    if (gameObj.gametype === 'worldle'){
    return(
        <div className="gamecard">
            <h2 id="gametype">Worldle</h2>
            <h3 id="day"></h3>
            <h3 id="attempts"></h3>

        </div>
    )}
    if (gameObj.gametype === 'travle'){
        return(
            <div className="gamecard">
                <h2 id="gametype">Travle</h2>
            </div>
    )}
    if (gameObj.gametype === 'countryle'){
        return(
            <div className="gamecard">
                <h2 id="gametype">Countryle</h2>
            </div>
    )} 
}

export default ScoreRender;