import './App.css';
import ScorePaster from './Components/score_submitter';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ScoreRender from './Components/score_renderer';
import PlayerSelector from './Components/playerSelector';
import CopyScoresButton from './Components/copyScoresButton';
import PointsModal from './Components/pointsModal';

function handleClick(setPlayer1,setPlayer2, user1, user2){
  setPlayer1(user1)
  setPlayer2(user2)
}

function handleBackClick(setHideSelector,setHideScoring,setHideTestMode){
  setHideSelector(false);
  setHideScoring(true);
  setHideTestMode(true);
}


function App() {
  const [scoresArray,setScoresArray] = useState([])
  const [player1,setPlayer1] = useState('test');
  const [player2,setPlayer2] = useState('none');
  const [masterPassword, setMasterPassword] = useState('');
  const [hideSelector, setHideSelector] = useState(true);
  const [hideScoring, setHideScoring] = useState(true);
  const [hideTestMode, setHideTestMode] = useState(true);

  // This function is called on App render.
  useEffect(() => {
    console.log('initial start')
    // Retrieve the scores for the day from  the back end
    const fetchData = async () => {
      try {
        const response = await axios.get('https://worldle-scorer-backend.onrender.com/api/today');
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
        const response = await axios.get('https://worldle-scorer-backend.onrender.com/api/password?currentplayer='+localStorage.getItem('user')+'&password='+localStorage.getItem('masterPassword'));
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
          <PointsModal/>
          <button onClick={()=> handleBackClick(setHideSelector,setHideScoring,setHideTestMode)}>Go Back</button>
        </div>
        <div hidden={hideTestMode}>
        <div id='testgap'>
        <ScoreRender scoresArray={scoresArray} player={player1}></ScoreRender>
        </div>
        <ScorePaster scoresArray={scoresArray} scoreUpdater={setScoresArray} player={player1}></ScorePaster>
          <h3>Go test your geography skills on <a href="https://worldle.teuteuf.fr/">Worldle</a> or <a href="https://imois.in/games/travle/">Travle</a> and paste the results above</h3>

          <CopyScoresButton scoresArray={scoresArray} player={player1}></CopyScoresButton>
          <PointsModal/>
          <h3>These are our scores today:</h3>
          <div id='renderSection'>
        <ScoreRender scoresArray={scoresArray} player={'sam'} ></ScoreRender>
        <ScoreRender scoresArray={scoresArray} player={'rory'} ></ScoreRender>        
          </div>

          <button className='playerSelectButton' onClick={()=> handleBackClick(setHideSelector,setHideScoring,setHideTestMode)}>Go Back</button>
        </div>
      <h6 style={{marginBottom:"10px"}}>Created by Sam Callaway</h6>
      <a href="https://github.com/Sam-Callaway/worldle_scorer">
        <img style={{height:"50px"}} src="github-mark.png"></img>
      </a>       
      </header>

    </div>
  );
  
}



export default App;
