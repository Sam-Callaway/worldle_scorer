import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function PointsModal (){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
    <div>
    <button className='playerSelectButton' onClick={handleOpen}>How Scoring Works</button>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Worldle
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            1st attempt: 300 Points<br></br>
            2nd attempt: 250 Points<br></br>
            3rd attempt: 200 Points<br></br>
            4th attempt: 150 Points<br></br>
            5th attempt: 100 Points<br></br>
            6th attempt: 50 Points<br></br>
            Fail: 0 Points<br></br>
            Each star: 20 Points<br></br>
            Coin: 10 Points<br></br>
            Population: 10 Points<br></br>
            </Typography>
            <br></br>
            <br></br>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Travle World
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Completed: 50 Points<br></br>
            All green bonus: 25 Points<br></br>
            Each guess remaining: 30 Points<br></br>
            Red	square: -10 Points<br></br>
            Black square: -25 Points<br></br>
            Hints: -5 Points<br></br>
            </Typography>
            <br></br>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Travle UK and Ireland
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Completed: 30 Points<br></br>
            All green bonus: 15 Points<br></br>
            Each guess remaining: 20 Points<br></br>
            Red	square: -7 Points<br></br>
            Black square: -15 Points<br></br>
            Hints: -3 Points<br></br>
            </Typography>
            <br></br>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Travle USA
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Completed: 20 Points<br></br>
            All green bonus: 10 Points<br></br>
            Each guess remaining: 12 Points<br></br>
            Red	square: -5 Points<br></br>
            Black square: -10 Points<br></br>
            Hints: -2 Points<br></br>
            </Typography>
            <br></br>
            <br></br>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Countryle
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Guess this in one and it's 1000 points. Congratulations!<br></br>
            Two guesses is 50 points and it's -5 for every additional guess after that.<br></br>
            </Typography>                                
        </Box>
    </Modal>
    </div>
    )
}
export default PointsModal;