import { Container, Typography } from '@mui/material';
import { baseUrl } from '../../../Constants/Components/Urls';
import React,{useEffect,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import axios from 'axios';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import NoData from '../../../SharedModule/Components/NoData/NoData';
import { toast } from "react-toastify";
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import style from './FavoriteRoom.module.css';
import Loading from '../../../SharedModule/Components/Loading/Loading';
export default function FavoriteRoom() {
  const[favorites,setFavorites]=useState([]);
  const navigate=useNavigate();
  let token = localStorage.getItem("adminToken");
  const [isLoading, setIsLoading] = useState(true);
  /////////////explore favorit list room//////////////////////////////////
  async function favoritesList() {
    try {
      const response= await axios.get(`${baseUrl}/portal/favorite-rooms`, {
        headers: {
          Authorization:token
        },
      }
     
    );
   
    setFavorites(response.data.data.favoriteRooms[0].rooms);
    //setFavorites(response.data.data.favoriteRooms[0].user._id);
      console.log(response.data.data.favoriteRooms[0].rooms);
      
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    favoritesList();
  }, []);

  ///////////////////////////delete fav room///////////////////////////////////////

  async function deleteFavRoom(roomId) {
    console.log(roomId)
    try {
      const response= await axios.delete(`${baseUrl}/portal/favorite-rooms/${roomId}`, {
        data:{roomId:roomId},
        headers: {
          Authorization: localStorage.getItem("adminToken"),
        },
            
      }
     
    );
      console.log(response);
      toast.success('Room deleted successfully')
      favoritesList();
    } catch (error) {
      // console.error(error);
      toast.error(error)
    }
  }
  return (
   <>
 <Container sx={{background:'#FFFFFF'}}>
<Typography sx={{marginTop:'60px',display:'flex',justifyContent:'center', fontSize:'40px',color:'#152C5B',fontFamily:"sans-serif"}}>Your Favorites </Typography>
<Link sx={{textDecoration:'none',color:'gray'}} href="/">Home</Link>
<Link sx={{textDecoration:'none',color:'gray'}} href="/favorite-room"> / Favorites</Link>
<Typography sx={{marginTop:'50px',color:'#152C5B',fontSize:'20px',fontFamily:"sans-serif"}}>
Your Rooms
</Typography>

      <Box sx={{marginTop:'50px'}}>
{isLoading ? (
            <Loading />
          ) :
          favorites?.length > 0 ? (
          <Paper>
             
             <Box
     
    >
      
      <ImageList sx={{ width: '100%',  }} cols={4} >
      {favorites.map((favRoom) => (
        <ImageListItem className={style.member}  key={favRoom._id}>
         <img
           loading="lazy"
                            className=" imagemodify"
                            src={
                             
                                favRoom?.images[0]
                            }
                          />
                           <Box className={style.memberCaption}>
                            <div className={style.icon}>
                            <FavoriteIcon onClick={()=>deleteFavRoom(favRoom._id)} sx={{margin:'20px'}}  />
                            <VisibilityIcon sx={{color:'white'}} onClick={()=>navigate(`/all-rooms/room-details/${favRoom?._id}`)}/>
                            </div>
                          </Box>
                          
        </ImageListItem>

       

      )
      )}
    </ImageList>

   
            
              </Box>
              </Paper>
          ) : (
            <NoData/>
          )}
        </Box>


      
   </Container>
   </>
  )
}
