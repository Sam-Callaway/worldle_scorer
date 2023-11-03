import React from "react";

function CopyScoresButton(props){
    return (
        <button className='passwordSubmitButton' onClick={() => createText(props.scoresArray, props.player)}>Copy your scores to share to your friends</button>
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
                currentText = "Worldle ("+gameObj.attempts+"/6) "+gameObj.score+" Points\n";
                scoresText = scoresText + currentText;
            }
            if (gameObj.gameType === 'travle'){
                if (gameObj.country === 'world'){
                    currentText = "Travle ("+gameObj.attempts+"/"+gameObj.chances+") "+gameObj.score+" Points\n";
                    scoresText = scoresText + currentText;
                } else {
                    currentText = "Travle_"+gameObj.country+" ("+gameObj.attempts+"/"+gameObj.chances+") "+gameObj.score+" Points\n";
                    scoresText = scoresText + currentText; 
                }
                
            }
            if (gameObj.gameType === 'countryle'){
                currentText = "Countryle "+gameObj.attempts+" Guesses "+gameObj.score+" Points\n";
                scoresText = scoresText + currentText;
            }
        }
    }
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