import {useState} from 'react';
import axios from 'axios';
import FAQ from './FAQ';




function handleClick(setPlayer1,setPlayer2, user1, user2){
    setPlayer1(user1)
    setPlayer2(user2)
}

// Function to send the password the user has entered to the back end to check it is correct
const enterPassword = async(password, currentPlayer, setHidePasswordBox, setHideSelector, setHideScoring, setHidePasswordWarning, setPlayer1, setPlayer2, setMasterPassword) => {
    let passwordString = String(password)
    let currentPlayerString = String(currentPlayer)
    console.log("checking password")
    try {
        const response = await axios.get('https://worldle-scorer-backend.onrender.com/api/password?currentplayer='+currentPlayerString+'&password='+passwordString);
        if (response.data === 'Password good'){
            setHidePasswordBox(true)
            setHideSelector(true)
            setHideScoring(false)
            setHidePasswordWarning(true)
            setMasterPassword(password)
            localStorage.setItem('user',currentPlayer)
            localStorage.setItem('masterPassword',password)
            if (currentPlayer === 'sam'){handleClick(setPlayer1,setPlayer2,'sam','rory')}
            if (currentPlayer === 'rory'){handleClick(setPlayer1,setPlayer2,'rory','sam')}
            return; 
        } else 
        if (response.data === 'Password bad'){
            setHidePasswordWarning(false)
            return;
        }
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }

}

function PlayerSelector (props){

const [currentPlayer,setCurrentPlayer] = useState('')


const [hidePasswordWarning, setHidePasswordWarning] = useState(true);
const [hidePasswordBox, setHidePasswordBox] = useState(true);
const [password, setPassword] = useState('')
const handleInputChange = (event) => {
    setPassword(event.target.value);
  };
    return(
        <div>
        <h1>Worldle Scorer</h1>
        <h4 style={{marginBottom:"10px"}}>Who are you?</h4>
        <div id='playerButtonGrid'>
        <button className='playerSelectButton' onClick={() => {props.setHideTestMode(false); props.setHideSelector(true)}}>
            Just testing it out
        </button>
        <button className='playerSelectButton' onClick={() => {setHidePasswordBox(false); setCurrentPlayer('sam')}}>
            Sam
        </button>
        <button className='playerSelectButton' onClick={() => {setHidePasswordBox(false); setCurrentPlayer('rory')}}>
            Rory
        </button>
        <FAQ></FAQ>
        </div>
        <div id='passwordBox' hidden={hidePasswordBox}>Enter Password:<div><input value={password} onChange={handleInputChange}></input><button onClick={() => (enterPassword(password,currentPlayer,setHidePasswordBox,props.setHideSelector,props.setHideScoring,setHidePasswordWarning,props.setPlayer1, props.setPlayer2, props.setMasterPassword))} className='passwordSubmitButton'>Submit</button></div>
        <div hidden={hidePasswordWarning}>Incorrect Password</div>
        </div>
        </div>
    )


};

export default PlayerSelector;