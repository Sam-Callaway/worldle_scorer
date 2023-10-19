import {useState} from 'react';



function handleClick(props, user1, user2){
    props.setPlayer1(user1)
    props.setPlayer2(user2)
}

function enterPassword(setHidePasswordBox, ){
    
}

function PlayerSelector (props){

let currentPlayer = ''

const [hidePasswordBox, setHidePasswordBox] = useState(true);
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
        <div id='passwordBox' hidden={hidePasswordBox}><input></input><button>Submit</button></div>
        </div>
    )


};

export default PlayerSelector;