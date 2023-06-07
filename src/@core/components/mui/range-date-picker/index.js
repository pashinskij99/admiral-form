import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { Box, TextField } from '@mui/material';

// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import ReactDatePicker from 'react-datepicker';
import { useState } from 'react';

const CustomRangeDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date("2014/02/08"))
  const [endDate, setEndDate] = useState(new Date("2014/02/10"))

  return (
    <Box width={'500px'}>
      <ReactDatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <ReactDatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />

    </Box>
  )
}

export default CustomRangeDatePicker