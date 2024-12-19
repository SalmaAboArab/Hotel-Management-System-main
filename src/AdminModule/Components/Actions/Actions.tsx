import { Delete, MoreVert, Visibility } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Menu } from "@mui/material";
import { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import * as React from "react";
import AddAds from "../Ads/Components/ActionsAds/AddAds";
import { baseUrl } from "../../../Constants/Components/Urls";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.05) 0px 5px 5px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));
type props = {
  allActions: string;
  id: string;
  openDeleteModal: Function;
  openViewModal: Function;
  openUpdateModel:Function;
  curruntItem:object;
  name:string;
};
export default function Actions({
  allActions,
  id,
  openDeleteModal,
  openViewModal,
  openUpdateModel,
  curruntItem,
  name
}: props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const navigateTo=useNavigate();


  const [valuesItem, setValuesItem] = React.useState({})
  async function getOneAds() {
    try {
      const { data } = await axios.get(`${baseUrl}/admin/ads/${id}`, {
        headers: {
          Authorization:localStorage.getItem("adminToken")
        },
      });
      setValuesItem(data.data.ads)
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <>
      <AddAds  open={openAdd} handleClose={handleCloseAdd} updateValues={valuesItem} 
      id={id} />

      {allActions == "no" ? (
        <Button
        sx={{mx:2}}
          onClick={() => {
            handleClose;
            openViewModal(curruntItem);
          }}
          disableRipple
        >
          <Visibility sx={{ color: "#203FC7", mx: 1 }} />
          View
        </Button>
      ) : (
        <Box>
          <Button
            variant="text"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVert />
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleClose;
                openViewModal(curruntItem);
                handleClose()
              }}
              disableRipple
            >
              <Visibility />
              View
            </MenuItem>
            {name=='booking'?'':
            <MenuItem
            onClick={() => {
              if(name=='ads'){
                handleOpenAdd();
              getOneAds();
              }
              else if(name === 'facilities'){
                openUpdateModel(curruntItem)
              }
              else if(name=='rooms'){
                
                  localStorage.setItem(
                    "id",id );

                  navigateTo(`/Admin/rooms/update-room/${id}`,{state:{room:curruntItem}});
                }
              
              handleClose()
            }}
            disableRipple
          >
            <EditIcon />
            Edit
          </MenuItem>
            }
            <MenuItem
              onClick={() => {
                openDeleteModal(curruntItem);
                handleClose()
              }}
              disableRipple
            >
              <Delete />
              Delete
            </MenuItem>
          </StyledMenu>
        </Box>
      )}

    </>
  );
}
