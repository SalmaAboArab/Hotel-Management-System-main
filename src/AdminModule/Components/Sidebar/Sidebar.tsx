import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PersonIcon from '@mui/icons-material/Person';
import AddHomeIcon from '@mui/icons-material/AddHome';
import MuiDrawer from '@mui/material/Drawer';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import List from '@mui/material/List';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import Modal from 'react-bootstrap/Modal';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import ListItemText from '@mui/material/ListItemText';
import AppsIcon from '@mui/icons-material/Apps';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import ChangePassword from '../../../AuthModule/Components/ChangePassword/ChangePassword';
import Logout from '../../../AuthModule/Components/Logout/Logout';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  backgroundColor:"#203FC7",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));




const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


export default function Sidebar() {

  const navigateTo=useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
 
  const [show, setShow] = React.useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [openLogoutModal, setOpenLogoutModal] = React.useState(false);
  const handleOpenLogoutModal = () => setOpenLogoutModal(true);
  const handleCloseLogoutModal = () => setOpenLogoutModal(false);
 
  return (
    <>
   < Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
        <ChangePassword handleClose={handleClose}/>
        </Modal.Body>
      </Modal>

  
    <Box sx={{ display: 'flex'  }}>
      <CssBaseline />
      <Drawer variant="permanent"  open={open} className='sidBar'>
        <DrawerHeader>
      
          <IconButton onClick={handleToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{backgroundColor:"#203FC7",color:"white",height:"100%" }}>

            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={()=>{navigateTo("/Admin")}}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color:"white",
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                <AddHomeIcon/> 
                </ListItemIcon>
                <ListItemText primary="Home"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={()=>{navigateTo("/Admin/users")}}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              > 
                <ListItemIcon
                  sx={{
                    color:"white",
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <PersonIcon/>
                </ListItemIcon>
                <ListItemText primary="Users"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={()=>{navigateTo("/Admin/rooms")}}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color:"white",
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <AppsIcon/>
                </ListItemIcon>
                <ListItemText primary="Rooms"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={()=>{navigateTo("/Admin/ads")}}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color:"white",
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <CalendarMonthIcon/>
                </ListItemIcon>
                <ListItemText primary="Ads"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={()=>{navigateTo("/Admin/booking-list")}}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color:"white",
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
               <BeenhereIcon/>  
                </ListItemIcon>
                <ListItemText primary="Bookings"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={()=>{navigateTo("/Admin/facilities")}}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color:"white",
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <AutoAwesomeIcon/>
                </ListItemIcon>
                <ListItemText primary="Facilities"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
           
           onClick= {handleShow} 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
   
                <ListItemIcon
                  sx={{
                    color:"white",
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                    
                 <LockIcon/>
                </ListItemIcon>
                <ListItemText primary="ChangePassword"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

           
            <ListItem  disablePadding sx={{ display: 'block' }}>
              <ListItemButton
              onClick={()=>{handleOpenLogoutModal()}}
                sx={{
                  color:"white",
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color:"white",
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <AssignmentReturnIcon/>
                </ListItemIcon>
                <ListItemText primary="Logout"  sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
       
      </Drawer>
      
    </Box>
    {
      openLogoutModal?
      <Logout closeModal={handleCloseLogoutModal}/>
      :''
    }
    </>
  );
}
