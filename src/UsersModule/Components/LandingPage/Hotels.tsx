import { Box, Grid } from '@mui/material'
import React from 'react'
import { SectionLabel, StaticGrids } from './LandingSharedModules'

export default function Hotels() {
  return (
    <Box width={"75%"} mx={"auto"} mt={3}>
          <SectionLabel label="Hotels with large living room" />

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
            <StaticGrids type="hotel" index={0} />
            <StaticGrids type="hotel" index={1} />
            <StaticGrids type="hotel" index={2} />
            <StaticGrids type="hotel" index={3} />
          </Grid>
        </Box>
  )
}
