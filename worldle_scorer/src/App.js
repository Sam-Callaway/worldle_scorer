import './App.css';
import ScorePaster from './Components/score_submitter';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ScoreRender from './Components/score_renderer';
import PlayerSelector from './Components/playerSelector';
import CopyScoresButton from './Components/copyScoresButton';
import History from './Components/history';

const masterUrl = 'https://worldle-scorer-backend.onrender.com';
//const masterUrl = 'http://localhost:4000';

function handleClick(setPlayer1,setPlayer2, user1, user2){
  setPlayer1(user1)
  setPlayer2(user2)
}

function historyButtonToggle(hideHistory, player1, setHideHistory,setHideScoring,setHideSelector,setHideTestMode){
    if(hideHistory === true){
      setHideHistory(false);
      setHideScoring(true);
      setHideSelector(true);
      setHideTestMode(true);

    }else
    {setHideHistory(true);
      console.log(player1)
      if(player1 === 'sam' || player1 === 'rory'){
      setHideScoring(false);
      } else
      {setHideSelector(false)}
    }
}


function App() {
  const [scoresArray,setScoresArray] = useState([])
  const [player1,setPlayer1] = useState('test');
  const [player2,setPlayer2] = useState('none');
  const [masterPassword, setMasterPassword] = useState('');
  const [hideSelector, setHideSelector] = useState(true);
  const [hideScoring, setHideScoring] = useState(true);
  const [hideTestMode, setHideTestMode] = useState(true);
  const [hideHistory, setHideHistory] = useState(true);

  // This function is called on App render.
  useEffect(() => {
    console.log('initial start')
    // Retrieve the scores for the day from  the back end
    const fetchData = async () => {
      try {
        const response = await axios.get(masterUrl+'/api/today');
        console.log('data received')
        console.log(response.data)
        let receivedData = response.data
        if (Object.keys(receivedData).length === 0) {
          receivedData = []
        }

        setScoresArray(receivedData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
      // Check if this is one of the two players returning and check the password saved in local storage. If it all checks out then skip the first menu and go to the screen for entering scores.
      // I know it isn't 100% secure to be keeping the 'user name' and password in local storage plaintext. However, they're just passwords I made up specifically for this and there's not much at stake really with this website.
      if (localStorage.getItem('user') === 'rory' || localStorage.getItem('user') === 'sam'){
        console.log("user is" + localStorage.getItem('user'))
        console.log("user found")
      try {
        const response = await axios.get(masterUrl+'/api/password?currentplayer='+localStorage.getItem('user')+'&password='+localStorage.getItem('masterPassword'));
        if (response.data === 'Password good'){
            setHideSelector(true)
            setHideScoring(false)
            setMasterPassword(localStorage.getItem('masterPassword'))
            if (localStorage.getItem('user') === 'sam'){handleClick(setPlayer1,setPlayer2,'sam','rory')}
            if (localStorage.getItem('user') === 'rory'){handleClick(setPlayer1,setPlayer2,'rory','sam')}
            return; 
        } else 
        // If the password or user details are bad or there is nothing saved then we show the player selector screen
        if (response.data === 'Password bad'){
          setHideSelector(false);
            return;
        }
        if (response.data === 'Player not recognised'){
          setHideSelector(false);
            return;
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
        setHideSelector(false);
      }}else{
        console.log("no user found")
        setHideSelector(false);}
    };

    fetchData();
  }, []);
  
  let historyButtonText = ''

  if (hideHistory === true){historyButtonText = 'Show History'}else{historyButtonText = 'Go Back'}



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
          <CopyScoresButton scoresArray={scoresArray} player={player1}></CopyScoresButton>
        </div>
        <div hidden={hideTestMode}>
        <div id='testgap'>
        <ScoreRender scoresArray={scoresArray} player={player1}></ScoreRender>
        </div>
        <ScorePaster scoresArray={scoresArray} scoreUpdater={setScoresArray} player={player1}></ScorePaster>
          <h2>Go test your geography skills on <a href="https://worldle.teuteuf.fr/">Worldle</a> or <a href="https://imois.in/games/travle/">Travle</a> and paste the results above</h2>
          
          <h2>These are our scores today:</h2>
          <div id='renderSection'>
        <ScoreRender scoresArray={scoresArray} player={'sam'} ></ScoreRender>
        <ScoreRender scoresArray={scoresArray} player={'rory'} ></ScoreRender>
      </div>
    </div>
    <button id='historyButton' onClick={() => historyButtonToggle(hideHistory, player1, setHideHistory,setHideScoring,setHideSelector,setHideTestMode)}>{historyButtonText}</button>
    <div id='historyScreen'>
      <History></History>
    </div>
  </header>
</div>
  );
  
}



export default App;
