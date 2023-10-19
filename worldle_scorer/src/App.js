import logo from './logo.svg';
import './App.css';
import ScorePaster from './Components/score_submitter';
import { useState } from 'react';
import InitApiCall from './Components/api_call';
import ScoreRender from './Components/score_renderer';
import PlayerSelector from './Components/playerSelector';



function App() {
  const [scoresArray,setScoresArray] = useState([])
  const [player1,setPlayer1] = useState('test');
  const [player2,setPlayer2] = useState('none');
  const [password, setPassword] = useState('');
  const [hideSelector, setHideSelector] = useState(false);
  const [hideScoring, setHideScoring] = useState(true);
  const [hideTestMode, setHideTestMode] = useState(true);
  // setScoresArray(InitApiCall())
  console.log(player1)


  return (
    <div className="App">
      
      <header className="App-header">
        <div hidden={hideSelector}>
      <PlayerSelector setHideTestMode = {setHideTestMode} setHideScoring={setHideScoring} setHideSelector={setHideSelector} setPlayer1={setPlayer1} setPlayer2={setPlayer2} setPassword={setPassword}></PlayerSelector>
        </div>
        <div hidden={hideScoring}>
        <ScoreRender scoresArray={scoresArray} player={player1}></ScoreRender>
        <ScorePaster scoresArray={scoresArray} scoreUpdater={setScoresArray} player={player1}></ScorePaster>
        <ScoreRender scoresArray={scoresArray} player={player2}></ScoreRender>
        </div>
        <div hidden={hideTestMode}>
        <ScoreRender scoresArray={scoresArray} player={player1}></ScoreRender>
          <h2>Go try out your geography skills on <a href="https://worldle.teuteuf.fr/">Worldle</a> or <a href="https://imois.in/games/travle/">Travle</a> and paste the results below</h2>
        <ScorePaster scoresArray={scoresArray} scoreUpdater={setScoresArray} player={player1}></ScorePaster>
        </div>
      </header>
    </div>
  );
  
}



export default App;
