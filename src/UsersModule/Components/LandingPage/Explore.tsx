import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { SectionLabel } from './LandingSharedModules';
import landingImg from "../../../assets/landingImg.png";

export default function Explore() {

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();


    // type ExploreData = {
    //     startDate: Date;
    //     endDate: Date;
    //     capacity: number;
    //   };
    
      // const Explore = {
      //   startDate: new Date(),
      //   endDate: new Date(),
      //   capacity: new Number(),
      // };
    
      async function handleExplore(data: FieldValues) {
        // Explore.startDate = data.startDate;
        // Explore.endDate = data.endDate;
        // Explore.capacity = data.capacity;
        // navigate(`all-rooms/${JSON.stringify(Explore)}`);

        navigate(`all-rooms/${data.startDate}/${data.endDate}/${data.capacity}`);
      }
  return (
    <Box sx={{ my: 5, width: "75%", mx: "auto", height: "75vh" }}>
          <Grid
            container
            component="main"
            sx={{ height: "100%", overflow: "auto" }}
            className="pageOverflow"
          >
            
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              sx={{
                color: "#152C5B",
                overflow:'auto',
                height: "100%",
                width: "100%",
              }}
              className="pageOverflow"
            >
              <Container sx={{ mb: 5 }}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 700, lineHeight: 1.5, fontSize: "42px" }}
                >
                  Forget Busy Work, Start Next Vacation
                </Typography>
                <p style={{ color: "#B0B0B0", marginTop: 5 }}>
                  We provide what you need to enjoy your holiday with family.
                  Time to make another memorable moments.
                </p>
              </Container>

              <SectionLabel label="Start Booking" />
              <Container>
                <Box
                  component="form"
                  // noValidate
                  onSubmit={handleSubmit(handleExplore)}
                >
                  <Grid container component="main">
                    <Grid sm={6} xs={12}>
                      <Container>
                        <label
                          htmlFor="startDate"
                          style={{ marginTop: "10px", marginRight: "5px" }}
                        >
                          Pick a start date
                        </label>
                        <Box>
                          <TextField
                            type="date"
                            sx={{ bgcolor: "grey.100", width: "100%" }}
                            // placeholder="Please type here ..."
                            margin="dense"
                            fullWidth
                            id="startDate"
                            // label="Email Address"
                            autoComplete="date"
                            {...register("startDate", {
                              required: "Start date is required",
                            })}
                          />
                        </Box>
                        {errors.startDate && (
                          <Typography
                            variant="body2"
                            sx={{ color: "error.light" }}
                          >
                            {String(errors?.startDate?.message)}
                          </Typography>
                        )}
                      </Container>
                    </Grid>

                    <Grid sm={6} xs={12}>
                      <Container>
                        <label
                          htmlFor="endDate"
                          style={{ marginTop: "10px", marginRight: "5px"}}
                        >
                          Pick an end date
                        </label>
                        <Box>
                          <TextField
                            type="date"
                            sx={{ bgcolor: "grey.100", width: "100%" }}
                            // placeholder="Please type here ..."
                            margin="dense"
                            fullWidth
                            id="endDate"
                            // label="Email Address"
                            autoComplete="date"
                            {...register("endDate", {
                              required: "End date is required",
                            })}
                          />
                        </Box>
                        {errors.endDate && (
                          <Typography
                            variant="body2"
                            sx={{ color: "error.light" }}
                          >
                            {String(errors?.endDate?.message)}
                          </Typography>
                        )}
                      </Container>
                    </Grid>
                  </Grid>

                  <Grid container component="main">
                    <Grid xs={12}>
                      <Container>
                        <label
                          htmlFor="capacity"
                          style={{ marginTop: "10px", marginRight: "10px", marginBottom:'1%' }}
                        >
                          Capacity
                        </label>
                        <Box display={"flex"} alignItems={"center"}>
                          {/* <TextField
                            type="number"
                            sx={{ bgcolor: "grey.100", width: "100%" }}
                            // defaultValue={0}
                            // placeholder="Please type here ..."
                            margin="dense"
                            fullWidth
                            id="capacity"
                            autoComplete="number"
                            autoFocus
                            value={capacityValue}
                            onChange={handleCapacityChange}
                            // {...register("capacity", {
                            //   required: "capacity is required",
                            //
                            // })}
                          />
                          */}
                          <input type="number" id="capacity" min={1} max={10} onKeyDown={(e)=> e.preventDefault()}
                           style={{backgroundColor:'#F5F6F8', border:'solid #E5E5E5 1px', width:'100%',height:'50px', borderRadius:'4px',paddingLeft:'10px'}}
                           placeholder="Number of people..."
                           {...register("capacity", {
                              required: "capacity is required",
                            })}
                           />
                        </Box>
                        {errors.capacity && (
                          <Typography
                            variant="body2"
                            sx={{ color: "error.light" }}
                          >
                            {String(errors?.capacity?.message)}
                          </Typography>
                        )}
                      </Container>
                    </Grid>

                    <Grid sm={7} xs={12}>
                      <Container>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            width: "100%",
                            bgcolor: "#3252DF",
                            color: "white",
                            mt: "10%",
                            py: 1,
                          }}
                        >
                          Explore
                        </Button>
                      </Container>
                    </Grid>
                  </Grid>
                </Box>
              </Container>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              lg={6}
              sx={{
                position: "relative",
                height: "85%",
                // height: "100%",
                // minHeight:'60%',
                // maxHeight:'85%',
                width: "100%",
                mt: 5,
                // display:'flex',
                // alignItems:'center',
                // justifyContent:'space-between'
              }}
            >
              <Box>
                <Container
                  style={{
                    width: "73%",
                    height: "83%",
                    border: "solid #E5E5E5 2px",
                    borderRadius: "15px",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                  }}
                ></Container>
                <Container
                  sx={{
                    width: "75%",
                    height: "87%",
                    borderRadius: "15px",
                    borderTopLeftRadius: "100px",
                    position: "absolute",
                    top: "7%",
                    right: "6%",
                    backgroundImage: `url(${landingImg})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                ></Container>
              </Box>
            </Grid>
          </Grid>
        </Box>
  )
}
