import { Box, Container, Grid } from "@mui/material";
import styles from "./LandingPage.module.css";
import {
  AdsGrid,
  CardData,
  PriceContainer,
  adsData,
} from "./LandingSharedModules";
import axios from "axios";
import { baseUrl } from "../../../Constants/Components/Urls";
import { toast } from "react-toastify";
import { FavoriteOutlined } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

type AdsProps = {
  fiveAds: Array<object>;
  openAnonymousAlert: Function;
};

export default function Ads({ fiveAds, openAnonymousAlert }: AdsProps) {
  const navigate = useNavigate();

  async function addtofav(roomId: string) {
    let token = localStorage.getItem("adminToken");
    let role: string = JSON.parse(String(localStorage.getItem("userRole")));

    if (role == "user") {
      try {
        const response = await axios.post(
          `${baseUrl}/portal/favorite-rooms`,
          { roomId: roomId },
          { headers: { Authorization: token } }
        );
        toast.success("Room Added To Your Favourits Successfuly");
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Somthing Went Wrong!");
      }
    } else {
      openAnonymousAlert();
    }
  }

  function goToRoomDetails(roomId: string) {
    navigate(`all-rooms/room-details/${roomId}`);
  }

  return (
    <Grid
      container
      component="main"
      sx={{
        height: "65vh",
        justifyContent: "center",
        overflow: "auto",
      }}
      className={`pageOverflow`}
    >
      <Grid
        item
        xs={10}
        sm={6}
        md={4}
        lg={3}
        sx={{
          height: "95%",
          // width: "100%",
          paddingY: 3,
        }}
        className={` ${styles.imgContainer}`}
        position={"relative"}
      >
        <PriceContainer price={fiveAds[0]?.room?.price} />
        <Container
          sx={{
            height: "100%",
            width: "90%",
            backgroundImage: `url(${fiveAds[0]?.room?.images[0]})`,
            backgroundRepeat: "no-repeat",
            borderRadius: "20px",
            bgcolor: "gray",
            backgroundSize: "cover",
            backgroundPosition: "center",
            // position:'relative'
            display: "flex",
            alignItems: "end",
            justifyContent: "start",
          }}
        >
          <Box
          // position={'absolute'} bottom={0} left={0}
          >
            <CardData
              titleColor="white"
              descreptionColor="white"
              title={adsData[0].title}
              description={adsData[0].description}
            />
          </Box>
        </Container>
        <Container
          sx={{
            borderRadius: "20px",
            width: "90%",
            height: "100%",
            position: "relative",
            bottom: "100%",
            bgcolor: "#203FC736",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
          }}
          className={`${styles.imgLayout}`}
        >
          <button
            className="bg-transparent border-0 "
            onClick={() => addtofav(fiveAds[0]?.room?._id)}
          >
            <FavoriteOutlined sx={{ color: "white" }} />
          </button>
          <button
            className="bg-transparent border-0"
            onClick={() => goToRoomDetails(fiveAds[0]?.room?._id)}
          >
            <Visibility sx={{ color: "white" }} />
          </button>
        </Container>
      </Grid>

      <AdsGrid
        image1={fiveAds[1]?.room?.images[0]}
        image2={fiveAds[2]?.room?.images[0]}
        goToRoom={goToRoomDetails}
        firstAd={fiveAds[1]}
        secondAd={fiveAds[2]}
        addfav={addtofav}
        index={[1, 2]}
      />

      <AdsGrid
        image1={fiveAds[3]?.room?.images[0]}
        image2={fiveAds[4]?.room?.images[0]}
        goToRoom={goToRoomDetails}
        firstAd={fiveAds[3]}
        secondAd={fiveAds[4]}
        addfav={addtofav}
        index={[3, 4]}
      />
    </Grid>
  );
}
