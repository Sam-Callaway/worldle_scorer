import {useState} from 'react';

function handleClick(props, user1, user2){
    props.setPlayer1(user1)
    props.setPlayer2(user2)
}

function PlayerSelector (props){


    return(
        <div>
        <button onClick={() => handleClick(props, 'sam', 'rory')}>
            Sam
        </button>
        <button onClick={() => handleClick(props, 'test', 'none')}>
            Test
        </button>
        <button onClick={() => handleClick(props, 'rory', 'sam')}>
            Rory
        </button>
        </div>
    )


};

export default PlayerSelector;