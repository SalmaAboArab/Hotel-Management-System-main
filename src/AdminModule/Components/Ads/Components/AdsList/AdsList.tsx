import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../../Constants/Components/Urls";
import HeaderComponents from "../../../../../SharedModule/Components/HeaderComponents/HeaderComponents";
import Loading from "../../../../../SharedModule/Components/Loading/Loading";
import NoData from "../../../../../SharedModule/Components/NoData/NoData";
import Tables from "../../../../../SharedModule/Components/Tables/Tables";
import DeleteModal from "../../../DeleteModal/DeleteModal";
import AddAds from "../ActionsAds/AddAds";
import ViewModal from "../../../ViewModal/ViewModal";
import PaginationShared from "../../../../../SharedModule/Components/Pagination/PaginationShared";

export default function AdsList() {
  const [openAdd, setOpenAdd] = React.useState(false);
  
  const [adsList, setAdsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [curruntAd,setCurruntAd]=useState({});



  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (curruntItem:object) => {
    setOpenDeleteModal(true);
    setCurruntAd(curruntItem);
  }
  const handleCloseDeleteModal = () =>{
    setOpenDeleteModal(false);
    getAdsList();
  }

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);


  const [openViewModal, setOpenViewModal] = React.useState(false);
  const handleOpenViewModal = (curruntItem:object) => {
    setOpenViewModal(true);
    setCurruntAd(curruntItem);
  }
  const handleCloseViewModal = () => setOpenViewModal(false);
  
  
  const headerTableArray = [
    "Room Name",
    "Price",
    "Discount",
    "Capacity",
    "Active",
    "Actions"
    ];

  const distract = [
    ".room?.roomNumber",
    ".room?.price",
    ".room?.discount",
    ".room?.capacity",
    ".isActive",
  ];
  
   //? <<============= handle Pagination =============>>
   const [countPage, setCountPage] = useState(1);
   const [totalPages, setTotalPages] = useState(10);
 
   function handlePage(event: React.ChangeEvent<unknown>, page: number) {    
     setCountPage(page);
     localStorage.setItem("activePage", String(page));
   }
   
   useEffect(() => {
     const activePage = localStorage.getItem("activePage");
     if (activePage) {
       setCountPage(Number(activePage));
     }
   }, []);
 
   

  async function getAdsList() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/ads`, {
        headers: {
          Authorization:localStorage.getItem("adminToken")
        },
      });

      setAdsList(data.data.ads);
      setTotalPages(Math.ceil(data.data.totalCount / 10));
      
    } catch (error) {
      console.error("Error fetching ads:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
  }, []);
  useEffect(() => {
    getAdsList();
  },[openAdd]);
  console.log("dfd");
  


  
  return (
    <Box sx={{ padding: 2 }}>
    <AddAds open={openAdd} handleClose={handleCloseAdd}   getAdsList={getAdsList()} />

      <HeaderComponents
        title={"ADS Table Details"}
        buttonName={"Add New Ads"}
        anyFunction={handleOpenAdd}
        addOn={'yes'}
      />

      {isLoading ? (
        <Loading />
      ) : adsList.length !== 0 ? (<>
        <Tables array={adsList} distract={distract} headerTableArray={headerTableArray} openDeleteModal={handleOpenDeleteModal} openViewModal={handleOpenViewModal} actions={'yes'} name={'ads'}/>
   <PaginationShared countPage={countPage} handlePage={handlePage} totalPages={totalPages}/>

      </>
      ) : (
        <NoData />
      )}
      {openDeleteModal?
      <DeleteModal name={'ads'} closeModal={handleCloseDeleteModal} curruntItem={curruntAd}/>
      :''}
      {openViewModal?
      <ViewModal closeModal={handleCloseViewModal} curruntItem={curruntAd} paths={distract} lables={headerTableArray}/>
      :''}
    </Box>
  );
}
