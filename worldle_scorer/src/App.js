import logo from './logo.svg';
import './App.css';
import ScorePaster from './Components/score_submitter';
import { useState } from 'react';
import InitApiCall from './Components/api_call';
import ScoreRender from './Components/score_renderer';



function App() {
  const [scoresArray,setScoresArray] = useState([])
  const [player,setPlayer] = useState('sam');
  // setScoresArray(InitApiCall())



  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <ScoreRender scoresArray={scoresArray} player={player}></ScoreRender> */}
        <ScorePaster scoresArray={scoresArray} scoreUpdater={setScoresArray} player={player}></ScorePaster>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        
      </header>
    </div>
  );
  
}



export default App;
