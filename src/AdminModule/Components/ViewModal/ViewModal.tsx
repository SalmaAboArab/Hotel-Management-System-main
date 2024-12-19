import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
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

type props = {
  closeModal: Function;
  curruntItem:object;
  paths:string[];
  lables:string[];
};
export default function ViewModal({ closeModal, curruntItem, paths, lables }: props) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={() => {
        handleClose;
        closeModal();
      }}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} borderRadius={3} border="true" borderColor={"primary.main"}>
            <Typography variant="h5" sx={{color:'primary.dark',mb:3}}>Item Details</Typography>
          {/* <Box sx={{ textAlign: "center", mx: 5, my: 3 }}>
            <img src={trash} alt="" />
          </Box> */}
          <Box sx={{ textAlign: "center", mx: 0 }}>
            <Box key={curruntItem?._id} sx={{mt:5}}>
                  {paths.map((path, index) => (
                    <Typography key={index} align="center" sx={{'& span':{color:'primary.dark'},my:1}}>
                        {lables[index]} : 
                        <span> {String(eval(`curruntItem${path}`))}</span>
                        
                        
                    </Typography>
                  ))}
                  
                </Box>
            <Box>
              <Button
                variant="outlined"
                
                sx={{ mx: 1, my: 2, px: 3, color:"primary.dark" }}
                onClick={() => {
                  closeModal();
                  handleClose;
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

// import * as React from 'react';
