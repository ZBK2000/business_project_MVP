import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DateRangePickerNew(props) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    props.getUpData(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    props.getUpData(startDate, date);
  };

  return (
    <div>
       <h2>sdfasdfas</h2>
    
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     
      <div>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
          renderInput={(startProps) => (
            <input
              {...startProps}
              sx={{ border: props.missing && '1px solid red', zIndex: 9999 }}
              placeholder="Start Date"
            />
          )}
          PopperProps={{
            style: { zIndex: 9999 } // Set a higher z-index for the pop-up calendar
          }}
        />
      </div>
      <div>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={handleEndDateChange}
          renderInput={(endProps) => (
            <input
              {...endProps}
              sx={{ border: props.missing && '1px solid red', zIndex: 9999 }}
              placeholder="End Date"
            />
          )}
          PopperProps={{
            style: { zIndex: 9999 } // Set a higher z-index for the pop-up calendar
          }}
        />
      </div>
    </LocalizationProvider>
    </div>
  );
}
