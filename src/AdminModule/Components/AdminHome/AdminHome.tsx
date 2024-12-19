import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../../Constants/Components/Urls';
import { PieChart } from '@mui/x-charts';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { WorkOutlineOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';




export default function AdminHome() {

  const [dashboardData,setDashboardData]=useState({});
  // const data=[
  //   {id:0,value:dashboardData?.bookings?.pending,label:'pending'},
  //   {id:1,value:dashboardData?.bookings?.completed,label:'completed'},
  // ]
  async function getDashboardData() {
    const token=localStorage.getItem('adminToken');
    try {
      const response= await axios.get(`${baseUrl}/admin/dashboard`,{headers:{Authorization:token}});
      // console.log(response?.data?.data);
      setDashboardData(response?.data?.data);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getDashboardData();
  },[])

  return (
    // <Box sx={{ flexGrow: 1 }}></Box>
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
      py={5}
      container
      columnGap={1}
      rowGap={3}
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{boxShadow:'none', 
      
    }}
    >

        <Grid item
      xs={11}
      sm={5}
      md={3}
      component={Paper}
      elevation={6}
      square
      sx={{boxShadow:'none',bgcolor:'#3654d7',color:'white',borderRadius:'10px',textAlign:'center',alignContent:"center",py:2,height:'fit-content'}}
      >
       <Link to={'rooms'} style={{textDecoration:'none',color:'white'}}>
       <Box sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
       <Typography variant='h5' sx={{'& h5':{color:'#FFFFFFCC'}}}>{dashboardData?.rooms}
       <h5>Rooms</h5>
       </Typography>
        <Typography>
        <WorkOutlineOutlined sx={{fontSize:'40px',color:'#8dd3f1'}}/>
        </Typography>
       </Box>
       </Link>
        </Grid>

        <Grid item
      xs={11}
      sm={5}
      md={3}
      component={Paper}
      elevation={6}
      square
      sx={{boxShadow:'none',bgcolor:'#3654d7',color:'white',borderRadius:'10px',textAlign:'center',alignContent:"center",py:2,height:'fit-content'}}
      >
       <Link to={'facilities'} style={{textDecoration:'none',color:'white'}}>
       <Box sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
       <Typography variant='h5' sx={{'& h5':{color:'#FFFFFFCC'}}}>{dashboardData?.facilities}
       <h5>Facilities</h5>
       </Typography>
        <Typography>
        <WorkOutlineOutlined sx={{fontSize:'40px',color:'#8dd3f1'}}/>
        </Typography>
       </Box>
       </Link>
        </Grid>

        <Grid 
        item
        xs={11}
        sm={6}
        md={3}
      component={Paper}
      elevation={6}
      square
      sx={{boxShadow:'none',bgcolor:'#3654d7',color:'white',borderRadius:'10px',textAlign:'center',alignContent:"center",py:2,height:'fit-content'}}
      >
       <Link to={'ads'} style={{textDecoration:'none',color:'white'}}>
       <Box sx={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}}>
       <Typography variant='h5' sx={{'& h5':{color:'#FFFFFFCC'}}}>{dashboardData?.ads}
       <h5>Ads</h5>
       </Typography>
        <Typography>
        <WorkOutlineOutlined sx={{fontSize:'40px',color:'#8dd3f1'}}/>
        </Typography>
       </Box>
       </Link>
        </Grid>

    </Grid>

<Grid
      item
      sm={12}
      md={5}
      component={Paper}
      elevation={6}
      square
      sx={{boxShadow:'none'}}
    >
         <PieChart
      series={[
        {
          data:[
            {value:dashboardData?.bookings?.pending,label:'pending'},
            {value:dashboardData?.bookings?.completed,label:'completed'},
          ],
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
    </Grid>
    <Grid
      item
      sm={12}
      md={5}
      component={Paper}
      elevation={6}
      square
      sx={{boxShadow:'none'}}
    >
         <PieChart
      series={[
        {
          data:[
            {value:dashboardData?.users?.user,label:'user',color:'#e785e4'},
            // f990f5
            {value:dashboardData?.users?.admin,label:'admin',color:'#35C2FD'},
          ],
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
    </Grid>
    </Grid>
  )
}