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
    p: 4
  };

function FAQ (){
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return(
    <div style={{display:'flex',flexDirection: 'column'}}>
    <button className='playerSelectButton' onClick={handleOpen}>FAQ</button>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            What is this for?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Rory and I have had a long running competition across these 3 geography games. However, it would often dissolve into disputes over whether getting Worldle in 2 was equivalent to all greens in Travle and so on.
            <br></br>
            <br></br>
            So, this website was setup to conclusively score and decide who is the winner each day.
            </Typography>
            <br></br>
            <br></br>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            How did you decide how many points each game is worth?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This is based on our own, entirely arbitrary, ranking of which games are most important to win.
            <br></br>
            <br></br>
            Worldle is the most important so it gets the most points, followed by Travle then Countryle.
            <br></br>
            <br></br>
            Travle world is the most important of the Travles, then UK and Ireland, then USA which is the easiest of the Travles. We don't play other countries so they don't win points, sorry.
            <br></br>
            <br></br>
            Stars and other bonuses on Worldle don't earn many points because they're mainly there to be used as a tie breaker.                
            </Typography>
            <br></br>
            <br></br>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Why can't I see your scores?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            We used to be much more consistent in playing but have dropped off a bit recently. Rest assured, we would have scored very highly had we played.
            </Typography>
            <br></br>
            <br></br>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            My score didn't paste correctly
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Sometimes the Worldle site doesn't copy the score correctly, you will just have to edit it in a notepad before pasting here.
            <br></br>
            <br></br>
            Or, one of the sites has changed the format of their scores and I may not have corrected it here yet. Do make sure that you copy and paste directly into the box, not using any mobile keyboard clipboard bars.
            </Typography>
            
        </Box>
    </Modal>
    </div>
    )
}
export default FAQ;