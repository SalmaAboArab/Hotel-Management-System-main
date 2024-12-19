import { FavoriteOutlined } from "@mui/icons-material";
import { Box, Container, Grid, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import styles from "./LandingPage.module.css";
import hotel1 from "../../../assets/hotel1.png";
import hotel2 from "../../../assets/hotel2.png";
import hotel3 from "../../../assets/hotel3.png";
import hotel4 from "../../../assets/hotel4.png";

import house1 from "../../../assets/house1.png";
import house2 from "../../../assets/house2.png";
import house3 from "../../../assets/house3.png";
import house4 from "../../../assets/house4.png";

type adsImg = {
    image1: File;
    image2: File;
    goToRoom: Function;
    firstAd: {};
    secondAd: {};
    addfav: Function;
    index: number[];
  };
  
 export const AdsGrid = ({
    image1,
    image2,
    goToRoom,
    firstAd,
    secondAd,
    addfav,
    index,
  }: adsImg) => {
    return (
      <Grid
        item
        xs={6}
        sm={6}
        md={4}
        lg={3}
        sx={{
          height: "95%",
          width: "100%",
          paddingY: 5,
          alignContent: "center",
          position: "relative"
        }}
      >
        <span className={`${styles.imgContainer}`}>
          <ImgLayer
            width="90%"
            hight="42%"
            bottom="50%"
            goToRoom={goToRoom}
            curruntAd={firstAd}
            addfav={addfav}
          />
  
          <AdsImgCard
            width="90%"
            hight="50%"
            image={image1}
            marginB={2}
            price={firstAd?.room?.price}
            index={index[0]}
          />
        </span>
  
        <span className={`${styles.imgContainer}`}>
          <AdsImgCard
            width="90%"
            hight="50%"
            image={image2}
            marginB={0}
            price={secondAd?.room?.price}
            index={index[1]}
          />
  
          <ImgLayer
            width="90%"
            hight="42%"
            bottom="5%"
            goToRoom={goToRoom}
            curruntAd={secondAd}
            addfav={addfav}
          />
        </span>
      </Grid>
    );
  };
  
 export const SectionLabel = ({ label }: { label: string }) => {
    return (
      <Container>
        <Typography variant="h5" sx={{ color: "#152C5B" }}>
          {label}
        </Typography>
      </Container>
    );
  };
  
  type imgcontnr = {
    width: string;
    hight: string;
    image: File | string;
    marginB: number;
  };
  
 export const ImgCard = ({ width, hight, image, marginB }: imgcontnr) => {
    return (
      <Container
        sx={{
          height: hight,
          width: width,
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: marginB,
        }}
      ></Container>
    );
  };
  
  type AdsImgcontnr = {
    width: string;
    hight: string;
    image: File | string;
    marginB: number;
    price: number;
    index: number;
  };
  
 export const AdsImgCard = ({
    width,
    hight,
    image,
    marginB,
    price,
    index,
  }: AdsImgcontnr) => {
    return (
      <Container
        sx={{
          height: hight,
          width: width,
          backgroundImage: `url(${image})`,
          backgroundRepeat: "no-repeat",
          borderRadius: "20px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mb: marginB,
          bgcolor: "gray",
          // position:'relative'
        }}
      >
        <PriceContainer price={price}/>
        <Box
          height={"100%"}
          display={"flex"}
          alignItems={"end"}
          justifyContent={"start"}
        >
          <CardData
            titleColor="white"
            descreptionColor="white"
            title={adsData[index].title}
            description={adsData[index].description}
          />
        </Box>
      </Container>
    );
  };
  
 export const PriceContainer = ({price}:{price:number}) => {
    return (
      <Box
        color={"white"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        bgcolor={"#FF498B"}
        width={"180px"}
        height={"40px"}
        sx={{
          borderTopRightRadius: "15px",
          borderBottomLeftRadius: "15px",
          position: "absolute",
          right:'5%',
          zIndex:1
        }}
      >
        ${price} per night
      </Box>
    );
  };
  
  type layer = {
    width: string;
    hight: string;
    bottom: string;
    goToRoom: Function;
    curruntAd: {};
    addfav: Function;
  };
  
 export const ImgLayer = ({
    width,
    hight,
    bottom,
    goToRoom,
    curruntAd,
    addfav,
  }: layer) => {
    return (
      <Container
        sx={{
          borderRadius: "20px",
          width: width,
          height: hight,
          position: "absolute",
          bottom: bottom,
          left: "5%",
          bgcolor: "#203FC736",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
        }}
        className={`${styles.imgLayout}`}
      >
        <button
          className="bg-transparent border-0 "
          onClick={() => addfav(curruntAd?.room?._id)}
        >
          <FavoriteOutlined sx={{ color: "white" }} />
        </button>
        <button
          className="bg-transparent border-0"
          onClick={() => goToRoom(curruntAd?.room?._id)}
        >
          <Visibility sx={{ color: "white" }} />
        </button>
      </Container>
    );
  };
  
 export const StaticGrids = ({ type, index }: { type: string; index: number }) => {
    let data;
    if (type == "house") data = housesData;
    else data = hotelsData;
    return (
      <Grid
        item
        xs={9}
        sm={6}
        md={3}
        sx={{
          height: "75%",
          width: "100%",
          paddingY: 5,
          alignContent: "center",
        }}
      >
        <ImgCard width="90%" hight="100%" image={data[index].img} marginB={0} />
        <Box height={'25%'}>
        <CardData
          titleColor={"#152C5B"}
          descreptionColor={"#B0B0B0"}
          title={data[index].title}
          description={data[index].description}
        />
        </Box>
      </Grid>
    );
  };
  
 export const CardData = ({
    titleColor,
    descreptionColor,
    title,
    description,
  }: {
    titleColor: string;
    descreptionColor: string;
    title: string;
    description: string;
  }) => {
    return (
      <Container>
        <Typography variant="h6" mt={1} fontWeight={400} color={titleColor}>
          {title}
        </Typography>
        <p style={{ color: descreptionColor }}>{description}</p>
      </Container>
    );
  };

  export const adsData = [
    {
      title: "Blue Origin Fams",
      description: "Jakarta, Indonesia",
    },
  
    {
      title: "Ocean Land",
      description: "Bandung, Indonesia",
    },
  
    {
      title: "Vinna Vill",
      description: "Malang, Indonesia",
    },
  
    {
      title: "Stark House",
      description: "Malang, Indonesia",
    },
  
    {
      title: "Bobox",
      description: "Medan, Indonesia",
    },
  ];
  
  const housesData = [
    {
      img: house1,
      title: "Tabby Town",
      description: "Gunung Batu, Indonesia",
    },
    {
      img: house2,
      title: "Anggana",
      description: "Bogor, Indonesia",
    },
    {
      img: house3,
      title: "Seattle Rain",
      description: "Jakarta, Indonesia",
    },
    {
      img: house4,
      title: "Wodden Pit",
      description: "Wonosobo, Indonesia",
    },
  ];
  
  const hotelsData = [
    {
      img: hotel1,
      title: "Green Park",
      description: "Tangerang, Indonesia",
    },
    {
      img: hotel2,
      title: "Podo Wae",
      description: "Madiun, Indonesia",
    },
    {
      img: hotel3,
      title: "Silver Rain",
      description: "Bandung, Indonesia",
    },
    {
      img: hotel4,
      title: "Cashville",
      description: "Kemang, Indonesia",
    },
  ];
  
  