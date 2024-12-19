import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import  { useEffect, useState } from "react";
import { baseUrl } from "../../../Constants/Components/Urls";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar, Grid } from "@mui/material";
import defaultImage from "../../../assets/Avatar.png";

export default function Navbar() {
  const [userData, setUserData] = useState();
  const loginData = JSON.parse(localStorage.getItem("loginData"));
  let token = localStorage.getItem("adminToken");
  async function getUserDetails() {
    try {
      const response = await axios.get(
        `${baseUrl}/portal/users/${loginData._id}`,
        {
          headers: { Authorization: token },
        }
      );

      setUserData(response.data.data.user);
      console.log(response.data.data.user);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Grid container sx={{ background: "#FFFFFF" }} p={1} px={3}>
            <Grid item xs={12} sm={6}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                justifyContent={{ xs: "center", sm: "start" }}
                sx={{ flexGrow: 1 }}
                variant="h4"
                component="p"
                color="initial"
              >
                <Typography
                  display={"inline"}
                  style={{
                    fontSize: "clamp(1.6rem, 4vw, 2rem)",
                    color: "#3d5afe",
                  }}
                >
                  Stay
                </Typography>
                cation.
              </Typography>{" "}
            </Grid>
            <Grid  item xs={12} sm={6}>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={{ xs: "center", sm: "end" }}
              >
                <Avatar
                  src={
                    userData?.profileImage == null
                      ? defaultImage
                      : userData?.profileImage
                  }
                />
                <Typography
                  variant="caption"
                  color="black"
                  sx={{ padding: "15px" }}
                >
                  {userData?.userName}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </AppBar>
      </Box>
    </>
  );
}
