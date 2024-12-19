import {
  Box
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../Constants/Components/Urls";
import AnonymousUserAlert from "../AnonymousUserAlert/AnonymousUserAlert";
import NoData from "../../../SharedModule/Components/NoData/NoData";
import Loading from "../../../SharedModule/Components/Loading/Loading";
import Explore from "./Explore";
import Ads from "./Ads";
import { SectionLabel } from "./LandingSharedModules";
import Houses from "./Houses";
import Hotels from "./Hotels";
import Reviews from "./Reviews";

export default function LandingPage() {
  const [ads, setAds] = React.useState([]);
  let fiveAds = ads?.slice(0, 5);
  const [isLoading, setIsLoading] = useState(false);


  const [anonymousAlert, setAnonymousAlert] = useState(false);
  const handleCloseAnonymousAlert = () => setAnonymousAlert(false);
  const handleOpenAnonymousAlert = () => setAnonymousAlert(true);

  // const handleAnonymousAlert = (state:"close"|"open") =>{
  //   return ()=>{
  //     setAnonymousAlert("close" === state ? false: true )
  //   }
  // }


  async function getAds() {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/portal/ads`);
      console.log(response?.data?.data?.ads);
      setAds(response?.data?.data?.ads);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    
    getAds();
  }, []);

  return (
    <>
      <Box>

        <Explore/>

        {/* Ads */}
        <Box>
          <SectionLabel label="Most popular ads" />
          {isLoading ? (
            <Loading />
          ) : ads?.length > 0 ? (
            <Ads fiveAds={fiveAds} openAnonymousAlert={handleOpenAnonymousAlert}/>
          ) : (
            <NoData />
          )}
        </Box>

        <Houses/>

        <Hotels/>
         
         <Reviews/>
        
      </Box>


      {anonymousAlert ? (
        <AnonymousUserAlert closeModal={handleCloseAnonymousAlert} />
      ) : (
        ""
      )}
    </>
  );
}
