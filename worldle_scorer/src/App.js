import logo from './logo.svg';
import './App.css';
import ScorePaster from './Components/score_submitter';
import { useState } from 'react';
import InitApiCall from './Components/api_call';
import ScoreRender from './Components/score_renderer';



function App() {
  const [scoresArray,setScoresArray] = useState([])
  const [player1,setPlayer1] = useState('test');
  const [player2,setPlayer2] = useState('none');
  // setScoresArray(InitApiCall())


  return (
    <div className="App">
      <header className="App-header">
        <ScoreRender scoresArray={scoresArray} player={player1}></ScoreRender>
        <ScorePaster scoresArray={scoresArray} scoreUpdater={setScoresArray} player={player1}></ScorePaster>
        <ScoreRender scoresArray={scoresArray} player={player2}></ScoreRender>
      </header>
    </div>
  );
  
}



export default App;
