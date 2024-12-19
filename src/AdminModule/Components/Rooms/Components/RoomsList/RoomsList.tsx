import React, { useEffect, useState } from 'react'
import { Box, Button} from '@mui/material';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../../../../Constants/Components/Urls';
import Loading from '../../../../../SharedModule/Components/Loading/Loading';
import DeleteModal from '../../../DeleteModal/DeleteModal';
import Tables from '../../../../../SharedModule/Components/Tables/Tables';
import NoData from '../../../../../SharedModule/Components/NoData/NoData';
import ViewModal from '../../../ViewModal/ViewModal';

export default function RoomsList() {
  const [roomList,setRoomList]=useState([]);
  const [isLoading,setIsLoading]=useState(false)
  const navigateTo=useNavigate();
 
  const headerTableArray = [
    "roomNumber",
   " discount",
   " price",
    "capacity",
    // "images",
    "facilities",
    ""
  ];
  const distract = [
    ".roomNumber",
   " .discount",
   " .price",
    ".capacity",
    // `.imagePath`,
    ".facilities",
  ];

  //style el two modal
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const gitAllRoom=async()=>{
    const token=localStorage.getItem('adminToken');
try {
  setIsLoading(true)
  const {data}=await axios.get(`${baseUrl}/admin/rooms` ,
   {headers:{Authorization:token}})
   setRoomList(data?.data?.rooms);
   console.log(data.data.rooms)

} catch (error) {
  console.error("Error fetching rooms:", error)
}
setIsLoading(false);
  }
/* <delete room> */
const [curruntRoom,setCurruntRoom]=useState({});
const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (curruntItem:object) => {
    setOpenDeleteModal(true);
    setCurruntRoom(curruntItem);
  }

  const handleCloseDeleteModal = () =>{
    setOpenDeleteModal(false);
    gitAllRoom();
  }
  // view room
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const handleOpenViewModal = (curruntItem:object) => {
    setOpenViewModal(true);
    setCurruntRoom(curruntItem);
    
  }
  const handleCloseViewModal = () =>{
    setOpenViewModal(false);
  }

  useEffect(()=>{
gitAllRoom();
  },[])
  return (
    <>
   
  <Box sx={{ padding: 2 }}>


  <Grid container p={2} spacing={2} justifyContent="space-between">
    <Grid item spacing={6}>
<Typography variant='h4'>Rooms Table Details</Typography>
<Typography >You can check all details</Typography>
    </Grid>

<Grid item spacing={6}>
<Button onClick={()=>navigateTo("/Admin/rooms/rooms-form")} variant="contained" color="primary">
      Add New Room
    </Button>
</Grid>
   </Grid>
  {/*room table */}
  {isLoading ? (
        <Loading />
      ) : roomList.length !== 0 ? (
        <Tables 
        array={roomList} distract={distract} headerTableArray={headerTableArray}
         openDeleteModal={handleOpenDeleteModal} openViewModal={handleOpenViewModal} 
         name={'rooms'}/>
      ) : (
        <NoData />
      )}
      {openDeleteModal?
      <DeleteModal name={'rooms'} closeModal={handleCloseDeleteModal}
       curruntItem={curruntRoom}/>
      :''}
      {openViewModal?
      <ViewModal closeModal={handleCloseViewModal} curruntItem={curruntRoom}
       paths={distract}   lables={headerTableArray}/>
      :''}
     

  </Box>
  

    </>
  )
}


