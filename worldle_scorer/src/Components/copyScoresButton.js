
function CopyScoresButton(props){
    return (
        <button className='playerSelectButton' onClick={() => createText(props.scoresArray, props.player)}>Copy your scores to share to your friends</button>
    );
}

function createText(scoresArray, player){
    console.log("copying scores")
    let scoresText = ''
    let totalScore = 0
    for (let gameObj of scoresArray){
        if (gameObj.player === player){
            totalScore = totalScore + gameObj.score
            let currentText = ''
            if (gameObj.gameType === 'worldle'){
                let attempts = gameObj.attempts;
                if (attempts === 7){attempts = 'X'};
                currentText = "Worldle ("+attempts+"/6) "+gameObj.score+" Points\n";
                scoresText = scoresText + currentText;
            }
            if (gameObj.gameType === 'travle'){
                if (gameObj.country === 'world'){
                    let attempts = gameObj.attempts;
                    if (gameObj.fail === true){attempts = 'X'}
                    currentText = "Travle ("+attempts+"/"+gameObj.chances+") "+gameObj.score+" Points\n";
                    scoresText = scoresText + currentText;
                } else {
                    let attempts = gameObj.attempts;
                    if (gameObj.fail === true){attempts = 'X'}
                    currentText = "Travle_"+gameObj.country+" ("+attempts+"/"+gameObj.chances+") "+gameObj.score+" Points\n";
                    scoresText = scoresText + currentText; 
                }
                
            }
            if (gameObj.gameType === 'countryle'){
                currentText = "Countryle "+gameObj.attempts+" Guesses "+gameObj.score+" Points\n";
                scoresText = scoresText + currentText;
            }
        }
    }
    if (scoresText !== ''){scoresText = scoresText + "Total Score: "+totalScore}
    scoresToClipboard(scoresText)

}

async function scoresToClipboard(scoresText){
    try {
        await navigator.clipboard.writeText(scoresText);
        console.log('Content copied to clipboard');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }

}

export default CopyScoresButton;