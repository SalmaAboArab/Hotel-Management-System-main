import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { baseUrl } from "../../../../../Constants/Components/Urls";
import HeaderComponents from "../../../../../SharedModule/Components/HeaderComponents/HeaderComponents";
import Loading from "../../../../../SharedModule/Components/Loading/Loading";
import NoData from "../../../../../SharedModule/Components/NoData/NoData";
import PaginationShared from "../../../../../SharedModule/Components/Pagination/PaginationShared";
import Tables from "../../../../../SharedModule/Components/Tables/Tables";
import DeleteModal from "../../../DeleteModal/DeleteModal";
import ViewModal from "../../../ViewModal/ViewModal";

export default function FacilitiesList() {
  //useState=====>Update
  const [openActionsModal, setOpenActionsModal] = React.useState(false);
  const [currentFacility, setCurrentFacility] = React.useState({});
  const [currentAction, setCurrentAction] = React.useState("");

  const handleOpenUpdate = (Facility: object) => {
    setOpenActionsModal(true);
    setCurrentFacility(Facility);
    setValue("name", Facility?.name);
    setCurrentAction("update");
  };
  const handleOpenAdd = () => {
    setOpenActionsModal(true);
    setCurrentAction("add");
  };
  const handleCloseActionsModal = () => setOpenActionsModal(false);

  //hookForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  //  useEffect(() => {
  //    setValue('name',currentFacility.name)
  //  }, [currentFacility.name]);

  //function elllllllllllllll update

  async function onSubmitUpdateFacilities(data: object) {
    try {
      const response = await axios.put(
        `${baseUrl}/admin/room-facilities/${currentFacility?._id}`,
        data,{
          headers: {
            Authorization:localStorage.getItem("adminToken")
          }}
      );
      //console.log(response)
      toast.success("Facility Updated Succeefully");
      getFacilitiesList();
    } catch (error) {
      console.log(error);
    }
    handleCloseActionsModal();
  }

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

//function elllllllllllllll add

async function onSubmitAddFacilities(data:object) {
  try {
    const response = await axios.post(`${baseUrl}/admin/room-facilities`,data, {
      headers: {
        Authorization:localStorage.getItem("adminToken")   
         },
      
    });
   //console.log(response)
    toast.success('Facility Added Succeefully')
    getFacilitiesList();
    handleCloseActionsModal();
    
   
   
  } catch (error) {
  //  console.log(error);
   toast.error(error?.response?.data?.message||'Something is wrong');
   
  } 
}


  

  //function elllllllllllllll add

  async function onSubmitAddFacilities(data: object) {
    try {
      const response = await axios.post(
        `${baseUrl}/admin/room-facilities`,
        data,
        {
          headers: {
            Authorization:localStorage.getItem("adminToken")
          }
        }
      );
      //console.log(response)
      toast.success("Facility Added Succeefully");
      getFacilitiesList();
    } catch (error) {
      console.log(error);
    }
    handleCloseActionsModal();
  }

  const [facilitiesList, setFacilitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openViewModal, setOpenViewModal] = React.useState(false);
  const [curruntFacility, setCurruntFacility] = useState({});
  //view
  const handleOpenViewModal = (curruntItem: object) => {
    setOpenViewModal(true);
    setCurruntFacility(curruntItem);
  };
  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  //delete
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = (curruntItem: object) => {
    setOpenDeleteModal(true);
    setCurruntFacility(curruntItem);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    getFacilitiesList();
  };

  const headerTableArray = [
    // "id",
    "name",
    "createdBy",
    "createdAt",
    "updatedAt",
    "",
  ];

  const distract = [
    // "._id",
    ".name",
    ".createdBy?.userName",
    ".createdAt",
    ".updatedAt",
  ];
  //style el two modal
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //function elllllllllll list
  async function getFacilitiesList() {
    try {
      const { data } = await axios.get(
        `${baseUrl}/admin/room-facilities?page=${countPage}&size=10`,
        {
          headers: {
            Authorization:localStorage.getItem("adminToken")
          }
        }
      );

      setFacilitiesList(data.data.facilities);
      setTotalPages(Math.ceil(data.data.totalCount / 10));
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getFacilitiesList();
    
    
  }, [countPage]);

  return (
    <>
      <Box sx={{ padding: 2 }}>
        {/*model elllllllllllllll Update&add-----------------------------*/}
        <div>
          <Modal
            open={openActionsModal}
            onClose={handleCloseActionsModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {currentAction == "add" ? "Add" : "Edit"} Facility
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <form
                  onSubmit={
                    currentAction == "add"
                      ? handleSubmit(onSubmitAddFacilities)
                      : handleSubmit(onSubmitUpdateFacilities)
                  }
                >
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    fullWidth
                    type="name"
                    //  defaultValue={currentFacility?.name}
                    placeholder="Name"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <Typography variant="body2" sx={{ color: "red" }}>
                      {errors.name.message}
                    </Typography>
                  )}

                  <Button
                    sx={{ marginTop: "50px", float: "right" }}
                    type="submit"
                    variant="contained"
                  >
                    {currentAction == "add" ? "Add" : "Edit"}
                  </Button>
                </form>
              </Typography>
            </Box>
          </Modal>
        </div>

        {/*header*/}
        <HeaderComponents
          title={"Facilities Table Details"}
          buttonName={"Add New facilities"}
          anyFunction={handleOpenAdd}
        />

        {isLoading ? (
          <Loading />
        ) : facilitiesList.length !== 0 ? (
          <>
            <Tables
              openUpdateModel={handleOpenUpdate}
              array={facilitiesList}
              distract={distract}
              headerTableArray={headerTableArray}
              openDeleteModal={handleOpenDeleteModal}
              openViewModal={handleOpenViewModal}
              name={"facilities"}
            />

          <PaginationShared countPage={countPage} handlePage={handlePage} totalPages={totalPages}/>
          </>
        ) : (
          <NoData />
        )}
        {openDeleteModal ? (
          <DeleteModal
            name={"room-facilities"}
            closeModal={handleCloseDeleteModal}
            curruntItem={curruntFacility}
          />
        ) : (
          ""
        )}
        {openViewModal ? (
          <ViewModal
            closeModal={handleCloseViewModal}
            curruntItem={curruntFacility}
            paths={distract}
            lables={headerTableArray}
          />
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
