import './App.css';
import ScorePaster from './Components/score_submitter';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ScoreRender from './Components/score_renderer';
import PlayerSelector from './Components/playerSelector';

function handleClick(setPlayer1,setPlayer2, user1, user2){
  setPlayer1(user1)
  setPlayer2(user2)
}


function App() {
  const [scoresArray,setScoresArray] = useState([])
  const [player1,setPlayer1] = useState('test');
  const [player2,setPlayer2] = useState('none');
  const [masterPassword, setMasterPassword] = useState('');
  const [hideSelector, setHideSelector] = useState(true);
  const [hideScoring, setHideScoring] = useState(true);
  const [hideTestMode, setHideTestMode] = useState(true);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://worldle-scorer-backend.onrender.com/api/today');
        let receivedData = response.data
        if (Object.keys(receivedData).length === 0) {
          receivedData = []
        }

        setScoresArray(receivedData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      if (localStorage.getItem('user') === 'rory' || 'sam'){
      try {
        const response = await axios.get('https://worldle-scorer-backend.onrender.com/api/password?currentplayer='+localStorage.getItem('user')+'&password='+localStorage.getItem('masterPassword'));
        if (response.data === 'Password good'){
            setHideSelector(true)
            setHideScoring(false)
            setMasterPassword(localStorage.getItem('masterPassword'))
            if (localStorage.getItem('user') === 'sam'){handleClick(setPlayer1,setPlayer2,'sam','rory')}
            if (localStorage.getItem('user') === 'rory'){handleClick(setPlayer1,setPlayer2,'rory','sam')}
            return; 
        } else 
        if (response.data === 'Password bad'){
          setHideSelector(false);
            return;
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setHideSelector(false);
      }}else{setHideSelector(false);}
    };

    fetchData();
  }, []);
  
  



  return (
    <div className="App">
      
      <header className="App-header">
        <div hidden={hideSelector}>
      <PlayerSelector setHideTestMode = {setHideTestMode} setHideScoring={setHideScoring} setHideSelector={setHideSelector} setPlayer1={setPlayer1} setPlayer2={setPlayer2} setMasterPassword={setMasterPassword}></PlayerSelector>
        </div>
        <div id='mainScreen' hidden={hideScoring}>
          <div id='renderSection'>
        <ScoreRender scoresArray={scoresArray} player={player1} ></ScoreRender>
        <ScoreRender scoresArray={scoresArray} player={player2} ></ScoreRender>
          </div>
        <ScorePaster scoresArray={scoresArray} scoreUpdater={setScoresArray} player={player1} masterPassword={masterPassword}></ScorePaster>
          </div>
        <div hidden={hideTestMode}>
        <ScoreRender scoresArray={scoresArray} player={player1}></ScoreRender>
          <h2>Go test your geography skills on <a href="https://worldle.teuteuf.fr/">Worldle</a> or <a href="https://imois.in/games/travle/">Travle</a> and paste the results below</h2>
        <ScorePaster scoresArray={scoresArray} scoreUpdater={setScoresArray} player={player1}></ScorePaster>
        </div>
      </header>
    </div>
  );
  
}



export default App;
