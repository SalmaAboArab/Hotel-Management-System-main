import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../Constants/Components/Urls";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  TextField,
  Typography,
  CardMedia,
} from "@mui/material";

import { toast } from "react-toastify";
import BedIcon from "@mui/icons-material/Bed";
import WeekendIcon from "@mui/icons-material/Weekend";
import BathtubIcon from "@mui/icons-material/Bathtub";
import FlatwareIcon from "@mui/icons-material/Flatware";
import NetworkWifiIcon from "@mui/icons-material/NetworkWifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import TvIcon from "@mui/icons-material/Tv";
import BluetoothIcon from "@mui/icons-material/Bluetooth";

import Calendar from "./Calender";
import dayjs, { Dayjs } from "dayjs";

// import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowRight } from "@mui/icons-material";

// const DemoPaper = styled(Paper)(({ theme }) => ({
//   width: "100%",
//   height: "auto",
//   padding: theme.spacing(2),
//   ...theme.typography.body2,
// }));

export default function RoomDetails() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [roomInfo, setRoomInfo] = useState([]);
  const token = localStorage.getItem("adminToken");
  const { id } = useParams();
  const price=roomInfo?.price;
  const capacity=roomInfo?.capacity;
  const today = dayjs();
  const nextDate = dayjs().add(1, "day");
  const [selectedDateRange, setSelectedDateRange] = useState<[Dayjs, Dayjs]>([
    today,
    nextDate,
  ]);
  const roomDateStart = selectedDateRange[0];
  const roomDateEnd = selectedDateRange[1];
  const startDate = dayjs(roomDateStart).format("YYYY-MM-DD");
  const endDate = dayjs(roomDateEnd).format("YYYY-MM-DD");

  const getRoomDetail = async () => {
    try {
      const response = await axios.get(`${baseUrl}/portal/rooms/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      setRoomInfo(response?.data?.data?.room);
    } catch (error) {
      console.error("Somthing went wrong", error);
      setIsLoading(false);
    }
  };
  //create booking

  const createBooking = async () => {    
    try {
      const requestBody = {
        'startDate': startDate,
        'endDate': endDate,
        'room': id,
        'totalPrice': price * dayjs(roomDateEnd).diff(roomDateStart, "day") * capacity,
      };      

      const response = await axios.post(
        `${baseUrl}/portal/booking`,
        {data:requestBody},
        {
          headers: {
            Authorization: token
          }
        }
      );
      
      // console.log(response);
      toast.success("Booking created successfully");

      navigate(`/payment/:${id}`)
    } catch (error) {
      console.log(error);
      toast.error("Booking creation failed ");
    }
  };

  // create comment888888888888888888888888

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const submitRate = async (data: any) => {
    try {
      const response = await axios.post(
        `${baseUrl}/portal/room-reviews`,
        data,
        {
          headers: { Authorization: token },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Somthing went wrong", error);
    }
  };

  const createComment = async (data: any) => {
    console.log(data);
    
    try {
      const response = await axios.post(
        `${baseUrl}/portal/room-comments`,
        {'roomId':id,'comment':data.comment},
        {
          headers: { Authorization: token },
        }
      );

      console.log(response);
    } catch (error) {
      toast.error("Somthing went wrong", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getRoomDetail();
  }, []);

  // function srcset(images: [], size: number, rows = 1, cols = 1) {
  //   return {
  //     src: `${images}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
  //     srcSet: `${images}?w=${size * cols}&h=${
  //       size * rows
  //     }&fit=crop&auto=format&dpr=2 2x`,
  //   };
  // }
  return (
    <>
      <Box sx={{ minHeight: "30vw", width: "90%", margin: "auto", mt:6 }}>
        {!isLoading ? (
          <Loading />
        ) : (
          <>
            <Typography
              variant="h4"
              style={{ padding: "5px" }}
              textAlign={"center"}
            >
              {roomInfo?.roomNumber}
            </Typography>
            <Typography variant="body1" style={{ marginRight: "5px" }}>
              <Link to="/" style={{ color: "#1976d2", textDecoration: "none" }}>
                Home <ArrowRight/>
              </Link>
            </Typography>
            {roomInfo?.images?
            <Grid container   justifyContent={"center"} gap={3} my={5}>
            {roomInfo?.images?.map((image, index) => (
              <Grid  key={index} xs={12} sm={5} >
                <Card >
                  <CardMedia
                  sx={{}}
                    component="img"
                    alt={image.alt}
                    height={350}
                    image={image} // image.url should be the URL of the image
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
          :
          <Loading/>
          }

            <Grid
            justifyContent={"space-between"}
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              
            >
              <Grid item xs={12}  md={6} >
                <Typography
                  color="text.secondary"
                  sx={{ opacity: 0.6}}
                  mt={4}
                  paddingLeft={8}
                  paddingRight={3}
                  // variant="p"
                >
                  Minimal techno is a minimalist subgenre of techno music. It is
                  characterized by a stripped-down aesthetic that exploits the
                  use of repetition and understated development. Minimal techno
                  is thought to have been originally developed in the early
                  1990s by Detroit-based producers Robert Hood and Daniel Bell.
                  Such trends saw the demise of the soul-infused techno that
                  typified the original Detroit sound. Robert Hood has noted
                  that he and Daniel Bell both realized something was missing
                  from techno in the post-rave era. Such trends saw the demise
                  of the soul-infused techno that typified the original Detroit
                  sound. Robert Hood has noted that he and Daniel Bell both
                  realized something was missing from techno in the post-rave
                  era.
                </Typography>
                <Box sx={{ padding: "5px", textAlign: "center" }}>
                  <Box
                    sx={{
                      marginTop: "2rem",
                      display: "flex",
                      justifyContent: "center",
                      flexWrap:"wrap",
                      
                    }}
                    
                  >
                    <Box  my={3}  width={"150px"}>
                      <BedIcon
                        style={{
                          color: "#152C5B",
                          fontSize: "38px",
                          height: "38px",
                        }}
                      />
                      <Box style={{ color: "#B0B0B0" }}> Bedroom</Box>
                    </Box>
                    <Box   my={3}  width={"150px"}>
                      <WeekendIcon
                        style={{
                          color: "#152C5B",
                          fontSize: "38px",
                          height: "38px",
                        }}
                      />
                      <Box style={{ color: "#B0B0B0" }}> Living room</Box>
                    </Box>

                    <Box   my={3}  width={"150px"}>
                      <BathtubIcon
                        style={{
                          color: "#152C5B",
                          fontSize: "38px",
                          height: "38px",
                        }}
                      />
                      <Box style={{ color: "#B0B0B0" }}> Bathroom</Box>
                    </Box>

                    <Box  my={3}   width={"150px"}>
                      <FlatwareIcon
                        style={{
                          color: "#152C5B",
                          fontSize: "38px",
                          height: "38px",
                        }}
                      />
                      <Box style={{ color: "#B0B0B0" }}> Dining room</Box>
                    </Box>
                    
                    <Box  my={3}  width={"150px"}>
                      <NetworkWifiIcon
                        style={{
                          color: "#152C5B",
                          fontSize: "38px",
                          height: "38px",
                        }}
                      />
                      <Box style={{ color: "#B0B0B0" }}> Mbp/s</Box>
                    </Box>
                    <Box   my={3}  width={"150px"}>
                      <AcUnitIcon
                        style={{
                          color: "#152C5B",
                          fontSize: "38px",
                          height: "38px",
                        }}
                      />
                      <Box style={{ color: "#B0B0B0" }}>Unit Ready</Box>
                    </Box>

                    <Box   my={3}  width={"150px"}>
                      <BluetoothIcon
                        style={{
                          color: "#152C5B",
                          fontSize: "38px",
                          height: "38px",
                        }}
                      />
                      <Box style={{ color: "#B0B0B0" }}> Bluetooth</Box>
                    </Box>

                    <Box   my={3}  width={"150px"}>
                      <TvIcon
                        style={{
                          color: "#152C5B",
                          fontSize: "38px",
                          height: "38px",
                        }}
                      />
                      <Box style={{ color: "#B0B0B0" }}> television</Box>
                    </Box>
                  </Box>

                  {/* <Box
                    sx={{
                      marginTop: "2rem",
                      display: "flex",
                      justifyContent: "center",
                      flexWrap:"wrap"
                    }}
                  >
                   
                  </Box> */}
                </Box>
              </Grid>
              <Grid  item xs={12}  md={6}textAlign={"center"}>
                <Card>
                  <Typography variant="h5" component="div" mt={3}>
                    Start Booking
                  </Typography>

                  {/* booking8888888888888 */}
                  <CardContent>
                    <Typography variant="h5" p={5} color="text.secondary">
                      {roomInfo.price} $ Per night
                    </Typography>
                    <Typography variant="p" color="error">
                      Discount {roomInfo.discount} % off
                    </Typography>
                    <Typography p={5} color="text.secondary">
                      pick a date
                    </Typography>

                    <Calendar
                      {...{ selectedDateRange, setSelectedDateRange }}
                    /> 

                    <Typography p={1} mt={2} color="text.secondary">
                      you will pay {roomInfo.price * roomInfo.capacity} $ per{" "}
                      {roomInfo.capacity} person
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "3rem",
                      }}
                    >
                      <Button
                        onClick={() => {
                          createBooking();
                        }}
                        variant="contained"
                      >
                        Continue Book
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            <Grid container alignItems={"center"} my={3} >
              {/* Grid item with full width on extra-small screens and half width on medium screens */}
              <Grid item xs={12} md={6}>
                <Box
                  component="form"
                  onSubmit={handleSubmit(createComment)}
                  sx={{ maxWidth: 400, mx: "auto", p: 2 }}
                >
                  <Typography variant="h6" mb={2}>
                    Add Your Comment
                  </Typography>
                  <br />
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("comment", { required: true })}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Box>
              </Grid>

              {/* Grid item with full width on extra-small screens and half width on medium screens */}
              <Grid item xs={12} md={6}>
                <Box
                  component="form"
                  onSubmit={handleSubmit(submitRate)}
                  sx={{ maxWidth: 400, mx: "auto", p: 2 }}
                >
                  <Typography variant="h6" mb={2}>
                    Rate
                  </Typography>
                  <Typography>Message</Typography>
                  {/* <Rating
      {...register("rating",{required:true})}
      
      value={value}
      precision={0.5}
     
    /> */}
                  <TextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    {...register("review", { required: true })}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Rate
                  </Button>
                </Box>
              </Grid>

            </Grid>
          </>
        )}
      </Box>
    </>
  );
}
