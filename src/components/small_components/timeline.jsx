import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';


export default function TimeLinePicker(props) {

  const handleDateChange = (date) => {
    const formattedTime = dayjs(date).format('HH:mm');
    console.log(formattedTime)
    props.HourMinuteSetter(formattedTime)
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileTimePicker
        
        onChange={handleDateChange}
        sx={{border:props.missing&&"1px solid red"}}
        renderInput={(props) => (
          <TextField {...props} value={props.value ? dayjs(props.value).format('HH:mm') : ''} />
        )}
      />
    </LocalizationProvider>
  );
}
