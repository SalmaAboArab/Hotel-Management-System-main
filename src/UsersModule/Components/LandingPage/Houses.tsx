import { Box, Grid } from '@mui/material'
import React from 'react'
import { SectionLabel, StaticGrids } from './LandingSharedModules'

export default function Houses() {
  return (
    <Box width={"75%"} mx={"auto"} mt={3}>
          <SectionLabel label="Houses with beauty backyard" />

          <Grid
            container
            component="main"
            sx={{
              height: "40vh",
              justifyContent: "center",
              overflow: "auto",
              mt: 3,
            }}
            className={`pageOverflow`}
          >
            <StaticGrids type="house" index={0} />
            <StaticGrids type="house" index={1} />
            <StaticGrids type="house" index={2} />
            <StaticGrids type="house" index={3} />
          </Grid>
        </Box>
  )
}
