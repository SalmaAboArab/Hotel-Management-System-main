import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  const style = {
    textAlign: "start",
    "@media (max-width:900px)": {
      textAlign: "center",
    },
    
  };

  const theme = createTheme({
    palette: {
      primary: {
        light: "#3252df",
        main: "#152c5b",
        dark: "#0252df",
      },

    },
  });
  return (
    <>
      <Divider component={"hr"} sx={{ bgcolor: 'black',height:1,my:2}} />
      <Container maxWidth="xl">
        <Grid container  spacing={1}>
          <Grid sx={style} item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Link
                to={"/"}
                style={{
                  textDecoration: "none",      
                }}
                >
                <Typography

                  component="h4"
                  sx={{
                    color: theme.palette.primary.main,
                    fontweight: 800,
                    mb:"12px"
                   
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      color: theme.palette.primary.light,
                      fontWeight: 700,
                      fontSize: "1.7rem",
                      
                    }}
                  >
                    Stay
                  </Typography>
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 500,
                      fontSize: "1.7rem",
                    }}
                  >
                    cation.
                  </Typography>
                </Typography>
              </Link>

              <Typography
              sx={{opacity:"0.5"}}
                variant="body1"
              >
                We kaboom your beauty holiday <br /> instantly and memorable.{" "}
              </Typography>
            </Box>
             

          </Grid>
          <Grid sx={style} item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  marginBottom: 3,
                }}
                variant="h6"
              >
                For Beginners
              </Typography>
              <Typography sx={{opacity:"0.5"}} variant="body1">New Account</Typography>
              <Typography sx={{opacity:"0.5"}} variant="body1">Start Booking a Room</Typography>
              <Typography sx={{opacity:"0.5"}} variant="body1">Use Payments</Typography>
            </Box>
          </Grid>
          <Grid sx={style} item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  marginBottom: 3,
                }}
                variant="h6"
              >
                Explore Us
              </Typography>
              <Typography  sx={{opacity:"0.5"}} variant="body1">Our Careers</Typography>
              <Typography  sx={{opacity:"0.5"}} variant="body1">Privacy</Typography>
              <Typography  sx={{opacity:"0.5"}} variant="body1">Terms & Conditions</Typography>
            </Box>
          </Grid>
          <Grid sx={style} item xs={12} sm={6} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  marginBottom: 3,
                }}
                variant="h6"
              >
                Connect Us
              </Typography>
              <Typography sx={{opacity:"0.5"}} variant="body1">support@staycation.id</Typography>
              
              <Typography sx={{opacity:"0.5"}} variant="body1">021 - 2208 - 1996</Typography>
              <Typography sx={{opacity:"0.5"}} variant="body1">
                Staycation, Kemang, Jakarta
              </Typography>
            </Box>
          </Grid>
          
          <Typography
            sx={{ textAlign: "center", width: "100%", mb: 3 , mt: 4 , opacity:"0.5"}}
            variant="body1"
          >
            Copyright 2019 • All rights reserved • Staycation
          </Typography>
        </Grid>
      </Container>
    </>
  );
}
