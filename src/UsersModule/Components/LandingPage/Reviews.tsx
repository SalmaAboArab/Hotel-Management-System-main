import { Star } from '@mui/icons-material'
import { Container, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import happyFamily from "../../../assets/family-withbg.png";

export default function Reviews() {
  return (
    <Box sx={{ my: 5, width: "75%", mx: "auto" }}>
          <Grid
            container
            component="main"
            sx={{ height: "70vh", overflow: "auto" }}
            className="pageOverflow"
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={{
                position: "relative",
                height: "100%",
                width: "100%",
              }}
            >
              <span>
                <Container
                  style={{
                    width: "70%",
                    height: "75%",
                    border: "solid #E5E5E5 2px",
                    borderRadius: "15px",
                    position: "absolute",
                    bottom: "7%",
                    left: 0,
                  }}
                ></Container>
                <Container
                  sx={{
                    width: "72%",
                    height: "75%",
                    borderRadius: "15px",
                    borderBottomRightRadius: "100px",
                    position: "absolute",
                    bottom: 0,
                    left: "6%",
                    backgroundImage: `url(${happyFamily})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: 'no-repeat',
                    border:"solid #E5E5E5 2px",
                  }}
                ></Container>
              </span>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              position={"relative"}
              sx={{
                color: "#152C5B",
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Container sx={{}}>
                <Typography variant="h6" my={3}>
                  Happy Family
                </Typography>
                <Star sx={{ color: "orange" }} />
                <Star sx={{ color: "orange" }} />
                <Star sx={{ color: "orange" }} />
                <Star sx={{ color: "orange" }} />
                <Star sx={{ color: "orange" }} />
                <Typography variant="h5" sx={{ fontSize: "27px", my: 3 }}>
                  What a great trip with my family and <br />I should try again
                  next time soon ...
                </Typography>
                <p style={{ color: "#B0B0B0" }}>Angga, Product Designer</p>
              </Container>
            </Grid>
          </Grid>
        </Box>
  )
}
