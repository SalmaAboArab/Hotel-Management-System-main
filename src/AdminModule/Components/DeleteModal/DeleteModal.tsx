import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import trash from '../../../assets/trash.png'
import axios from 'axios';
import { baseUrl } from '../../../Constants/Components/Urls';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: "95%", // Default width
  "@media (min-width:400px)": {
    width: 400,
  },
  "@media (min-width:800px)": {
    width: 450,
  },
};

type props={
    name:string;
    closeModal:Function;
    curruntItem:object;
}
export default function DeleteModal({name,closeModal,curruntItem}:props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  async function handleDelete() {
    try {
        let response= await axios.delete(`${baseUrl}/admin/${name}/${curruntItem?._id}`,{
            headers: {
              Authorization:localStorage.getItem("adminToken")
            },
          });
          toast.success('Item Deleted Successfully')
          
    } catch (error) {      
      toast.error('Somthing went wrong!');
    }
    handleClose();
    closeModal();

  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={()=>{handleClose;closeModal();}}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        
      >
        <Fade in={open}>
          <Box sx={style} borderRadius={3} border='true' borderColor={'#d32f2f'}>
            
            <Box sx={{textAlign:'center',mx:5,my:3}}><img src={trash} alt="" /></Box>
            <Box sx={{textAlign:'center',mx:0}}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
            Delete This Item ?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2, color:'#494949' }} component='p'>
            are you sure you want to delete this item? 

            </Typography>
            <Box>
                <Button
                  variant="outlined"
                  color='error'
                  sx={{mx:1, my:3, px:3}}
                  onClick={handleDelete}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color='info'
                  sx={{mx:1, my:3, px:3}}
                  onClick={()=>{closeModal(); handleClose;}}
                >
                  Cancel
                </Button>
            </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}