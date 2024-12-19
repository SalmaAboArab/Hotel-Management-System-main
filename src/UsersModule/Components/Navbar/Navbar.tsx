// import React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import {   useNavigate } from "react-router-dom";
// import Link from '@mui/material/Link';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { toast } from "react-toastify";


// export default function Navbar() {
//   let userRole=JSON.parse(localStorage.getItem('userRole')) ;
//   console.log(userRole);

//   let navigate=useNavigate();
//   const navItems = ['Home', 'About', 'Contact'];
//   const [mobileOpen, setMobileOpen] = React.useState(false);
//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
//   <Typography variant="h6" sx={{ my: 2 }}>
//     MUI
//   </Typography>
//   <Divider />
//   <List>
//     {navItems.map((item) => (
//       <ListItem key={item} disablePadding>
//         <ListItemButton sx={{ textAlign: 'center' }}>
//           <ListItemText primary={item} />
//         </ListItemButton>
//       </ListItem>
//     ))}
//   </List>
// </Box>

 
//   return (
//    <>


// <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" sx={{background:'#FFFFFF'}}>
//         <Toolbar>
         
//         <Typography
//            sx={{flexGrow:1}}
//             variant="h4"
//             component="div"
//             color="initial"
//           >
//             <Typography
//               variant=""
             
//               style={{ fontSize: "clamp(1rem, 4vw, 2rem)",color:'#3d5afe', marginLeft:'70px' }}
//             >
//               Stay
//             </Typography>
//             cation.
//           </Typography>



//           <Link href="/" sx={{margin:'10px',color:'black',textDecoration:'none',"&:hover":{color:'blue'}}}>
//                  Home
//           </Link>
//           <Link href="/all-rooms" sx={{margin:'10px',color:'black',textDecoration:'none',"&:hover":{color:'blue'}}}>
//                  Explore
//           </Link>
//           <IconButton sx={{p:'20px'}} >
// {userRole=='user'?( <FavoriteIcon onClick={() => navigate("/favorite-room")} color="error"/>):(<FavoriteIcon onClick={()=>toast.error('sure login')}/>)}
           
//           </IconButton>
        
//           <Button variant="outlined">AR</Button>

//          <Button variant="contained" color='primary'  sx={{ marginLeft: "10px",  height: "40px" }} onClick={() => navigate("./Authentication")}>Login Now</Button>
//           <Button variant="contained" color='success' sx={{ marginLeft: "10px",  height: "40px" ,background:'#ffc107' }}  onClick={() => navigate("./Authentication/register")}>Sign Up</Button>
         
//         </Toolbar>
//       </AppBar>
//     </Box>
//    {/*<Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar component="nav" sx={{ color: "#152C5B", background: "#fff" }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//           >
//             Staycation.
//           </Typography>
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            
//           <Typography
//            variant="caption"
//           >
//           <Link href="/" underline="hover" sx={{fontSize:'25px',margin:'10px'}}> Home </Link>
  
//           </Typography>
//           <Typography
//             variant="caption"          >
//            <Link href="/all-rooms" underline="hover" sx={{fontSize:'25px',margin:'10px'}}>Explore</Link>
  
 

//           </Typography>
//           <Button variant="contained"  sx={{ marginLeft: "10px", width: "180px", height: "40px" }} onClick={() => navigate("./Authentication")}>Login</Button>
//           <Button variant="caption"  sx={{ marginLeft: "10px", width: "180px", height: "40px" ,background:'#ffc107',color:'#FFFFFF' }}  onClick={() => navigate("./Authentication/register")}>SignUp</Button>
         
                   
                  
                  
                 
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <nav>
       
//       </nav>
//       <Box component="main" sx={{ p: 3 }}>
//         <Toolbar />
        
//       </Box>
//   </Box>*/}
    
//    </>
//   )
// }




import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let userRole = JSON.parse(localStorage.getItem("userRole"));
  let navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const logOut = () =>{
 localStorage.clear()
 navigate("/Authentication")
  }

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex",height:50 }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "#fff" }}>
        <Toolbar>
          <Typography
            sx={{ flexGrow: 1 }}
            variant="h4"
            component="div"
            color="initial"
          >
            <Typography
              variant=""
              style={{ fontSize: "clamp(1.6rem, 4vw, 2rem)", color: "#3d5afe" }}
            >
              Stay
            </Typography>
            cation.
          </Typography>

          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
              },
            }}
          >
            <Link
              href="/"
              mx={"5px"}
              sx={{
                color: "black",
                textDecoration: "none",
                "&:hover": { color: "blue" },
              }}
            >
              Home
            </Link>
            <Link
              href="/all-rooms"
              mx={"5px"}
              sx={{
                color: "black",
                textDecoration: "none",
                "&:hover": { color: "blue" },
              }}
            >
              Explore
            </Link>
            <IconButton sx={{ height: "40px", width: "40px" }}>
              {userRole == "user" ? (
                <FavoriteIcon
                  onClick={() => navigate("/favorite-room")}
                  color="error"
                />
              ) : (
                <FavoriteIcon onClick={() => toast.error("You should login first!")} />
              )}
            </IconButton>

            <Button variant="outlined">AR</Button>


{userRole != "user" ?<>


            <Button
              variant="contained"
              color="primary"
              sx={{ height: "40px", lineHeight: "1" }}
              onClick={() => navigate("./Authentication")}
            >
              Login Now
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ height: "40px", lineHeight: "1", background: "#ffc107" }}
              onClick={() => navigate("./Authentication/register")}
            >
              Sign Up
            </Button>
            </>
            :
            <Button
              variant="contained"
              color="error"
              sx={{ height: "40px",  background: "#900000" }}
              onClick={() => logOut()}
            >
              Log Out
            </Button>
            }

          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { xs: "flex", sm: "none" },
              justifyContent: "end",
            }}
          >
            <MenuIcon sx={{ color: "#3d5afe" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <Box
            p={4}
            gap={3}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Link
              href="/"
              display={"block"}
              sx={{
                textAlign: "center",
                color: "black",
                textDecoration: "none",
                "&:hover": { color: "blue" },
              }}
            >
              Home
            </Link>
            <Link
              href="/all-rooms"
              display={"block"}
              sx={{
                textAlign: "center",
                color: "black",
                textDecoration: "none",
                "&:hover": { color: "blue" },
              }}
            >
              Explore
            </Link>
            <IconButton sx={{ height: "50px", width: "50px" }}>
              {userRole == "user" ? (
                <FavoriteIcon
                  onClick={() => navigate("/favorite-room")}
                  color="error"
                />
              ) : (
                <FavoriteIcon onClick={() => toast.error("sure login")} />
              )}
            </IconButton>

            <Button variant="outlined">AR</Button>

            <Button
              variant="contained"
              color="primary"
              sx={{ height: "40px", display: "block" }}
              onClick={() => navigate("./Authentication")}
            >
              Login Now
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{ height: "40px", background: "#ffc107", display: "block" }}
              onClick={() => navigate("./Authentication/register")}
            >
              Sign Up
            </Button>
          </Box>
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
