/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs, { Dayjs } from "dayjs";
import { Box, Button, Popover, TextField } from "@mui/material";
import { DateRangeCalendar } from "@mui/x-date-pickers-pro/DateRangeCalendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useState } from "react";
import { CalendarMonth } from "@mui/icons-material";


interface IProps {
  selectedDateRange?: DateRange 
  setSelectedDateRange?: (range: DateRange) => void;
  theme?: any; 
}

type DateRange = [Dayjs, Dayjs];

const Calendar = ({ selectedDateRange, setSelectedDateRange  ,theme}: IProps) => {
  
  const [anchorEl, setAnchorEl] = useState<any>(null);
  if (!selectedDateRange) {
    // Provide a default value or return null/empty component
    return null;
  }

  const handleCalendarChange = (newDateRange: DateRange) => {
    setSelectedDateRange && setSelectedDateRange(newDateRange);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

//   const handleDateSelected = () => {
//     handlePopoverClose();
//   };

  const open = Boolean(anchorEl);
  return (
    
    <Box sx={{display :"flex" , justifyContent:"center" , marginTop:"2rem"
  
    
    
     }}>
      
      <Button
        sx={{
          fontSize: { xs: "1px", sm: "1px", md: "1px" },
       
          borderRadius: "1px",
          ml: "5px",
          my:{
            // xs : 2,
            sm :0
          }
        }}
        onClick={handleButtonClick}
        variant="contained"
        color="primary"
      >
        <CalendarMonth />
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateRangeCalendar"]}>
            <DateRangeCalendar
              value={selectedDateRange}
              onChange={handleCalendarChange}
            />
          </DemoContainer>
        </LocalizationProvider>
      </Popover>

      <TextField
  
  sx={{
    // width : { xs : "100%" ,sm : "87.5%" ,md :"84%" , lg :"84%"  , xl : "85%" },
    backgroundColor: theme?.palette.grey[100],
    border: 'none !important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiInputBase-input': {
      textAlign: 'center', // Center align the text value
    },
  }}
  value={`${dayjs(selectedDateRange[0])?.format("YYYY-MM-DD")} - ${dayjs(
    selectedDateRange[1]
  )?.format("YYYY-MM-DD")}`}
/>

    </Box>

  );
};

export default Calendar;
