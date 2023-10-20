import {useState} from 'react';
import axios from 'axios';


function handleClick(props, user1, user2){
    props.setPlayer1(user1)
    props.setPlayer2(user2)
}

const enterPassword = async(password, currentPlayer, setHidePasswordBox) => {
    let passwordString = String(password)
    console.log(currentPlayer)
    let currentPlayerString = String(currentPlayer)
    try {
        const response = await axios.get('http://localhost:4000/api/password?currentplayer='+currentPlayerString+'&password='+passwordString);
        console.log('Response from API:', response.data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }

}

function PlayerSelector (props){

let currentPlayer = ''

const [hidePasswordBox, setHidePasswordBox] = useState(true);
const [password, setPassword] = useState('')
const handleInputChange = (event) => {
    setPassword(event.target.value);
  };
    return(
        <div>
        <h1>Worldle Scorer</h1>
        <h3>Who are you?</h3>
        <div id='playerButtonGrid'>
        <button className='playerSelectButton' onClick={() => (props.setHideTestMode(false), props.setHideSelector(true))}>
            Just testing it out
        </button>
        <button className='playerSelectButton' onClick={() => (setHidePasswordBox(false), currentPlayer = 'sam')}>
            Sam
        </button>
        <button className='playerSelectButton' onClick={() => (setHidePasswordBox(false), currentPlayer = 'rory')}>
            Rory
        </button>
        </div>
        <div id='passwordBox' hidden={hidePasswordBox}>Enter Password:<div><input value={password} onChange={handleInputChange}></input><button onClick={() => (enterPassword(password,currentPlayer,setHidePasswordBox))} className='passwordSubmitButton'>Submit</button></div></div>
        </div>
    )


};

export default PlayerSelector;