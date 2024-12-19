
import './App.css'
import Login from './AuthModule/Components/Login/Login'
import Register from './AuthModule/Components/Register/Register'
import ForgotPassword from './AuthModule/Components/ForgotPassword/ForgotPassword'
import ResetPassword from './AuthModule/Components/ResetPassword/ResetPassword'
import ChangePassword from './AuthModule/Components/ChangePassword/ChangePassword'
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout'
import NotFound from './SharedModule/Components/NotFound/NotFound'
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout'
import AdminLayout from './SharedModule/Components/AdminLayout/AdminLayout'
import AdminHome from './AdminModule/Components/AdminHome/AdminHome'
import AdsList from './AdminModule/Components/Ads/Components/AdsList/AdsList'
import AdsForm from './AdminModule/Components/Ads/Components/AdsForm/AdsForm'
import BookingList from './AdminModule/Components/Booking/BookingList'
import FacilitiesList from './AdminModule/Components/Facilities/Components/FacilitiesList/FacilitiesList'
import FacilitiesForm from './AdminModule/Components/Facilities/Components/FacilitiesForm/FacilitiesForm'
import RoomsList from './AdminModule/Components/Rooms/Components/RoomsList/RoomsList'
import RoomsForm from './AdminModule/Components/Rooms/Components/RoomsForm/RoomsForm'
import UsersList from './AdminModule/Components/UsersList/UsersList'
import LandingPage from './UsersModule/Components/LandingPage/LandingPage'
import ProtectedRoute from './SharedModule/Components/ProtectedRoute/ProtectedRoute'
import AllRooms from './UsersModule/Components/AllRooms/AllRooms'
import RoomDetails from './UsersModule/Components/RoomDetails/RoomDetails'
import Payment from './AdminModule/Components/Payment/Payment'

import UpdateRoom from './AdminModule/Components/Rooms/Components/UpdateRoom/UpdateRoom'
import FavoriteRoom from './UsersModule/Components/FavoriteRoom/FavoriteRoom'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

function App() {


  const routers = createBrowserRouter([
    {
      path:"/",
      element:<MasterLayout/>,
      errorElement:<NotFound/>,
      children:
      [

        

        {index:true,element:<LandingPage/>},
        {path:'all-rooms',element:<AllRooms/>},
        {path:'all-rooms/:startdate/:enddate/:capacity',element:<AllRooms/>},
        {path:'favorite-room',element:<FavoriteRoom/>},
        // {path:'all-rooms/room-details/:id/:startdate/:enddate/:capacity',element:<RoomDetails/>},
        {path:'all-rooms/room-details/:id',element:<RoomDetails/>},
        {path:'payment/:id',element:<Payment/>}

       
      ]
    },
    {
      path:"Authentication",
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<Login/>},
        {path:"register",element:<Register/>},
        {path:"forgot-password",element:<ForgotPassword/>},
        {path:"reset-password",element:<ResetPassword/>}
        
      ]
    },
    {
      path:'Admin',
      element:(
        <ProtectedRoute><AdminLayout/></ProtectedRoute>
      ),
      errorElement:<NotFound/>,
      children:
      [
        {index:true,element:<AdminHome/>},
        {path:'users',element:<UsersList/>},
        {path:'ads',element:<AdsList/>},
        {path:'ads/ads-form',element:<AdsForm/>},
        {path:'booking-list',element:<BookingList/>},
        {path:'facilities',element:<FacilitiesList/>},
        {path:'facilities/facilities-form',element:<FacilitiesForm/>},
        {path:'rooms',element:<RoomsList/>},
        {path:'rooms/rooms-form',element:<RoomsForm/>},
        {path:'rooms/update-room/:roomId',element:<UpdateRoom/>},
        {path:"change-password",element:<ChangePassword/>}
      ]
    }
  ])


  return (
    <>
    
    <RouterProvider router={routers} />
    </>
  )
}

export default App
