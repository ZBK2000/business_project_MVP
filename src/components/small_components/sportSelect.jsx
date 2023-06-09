  {/*
import React, { useState } from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputIcon from '@mui/icons-material/Input';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
;

const sports = [
    { name: 'Soccer', icon: <SportsSoccerIcon /> },
    { name: 'Basketball', icon: <SportsBasketballIcon /> },
    { name: 'Tennis', icon: <SportsTennisIcon /> },
    { name: 'Cricket', icon: <SportsCricketIcon /> },
    { name: 'Esports', icon: <SportsEsportsIcon /> },
    { name: 'Handball', icon: <SportsHandballIcon /> },
    { name: 'Volleyball', icon: <SportsVolleyballIcon /> },
    { name: 'Cycling', icon: <DirectionsBikeIcon /> },

  ];

const OtherSportMenuItem = ({ onClick }) => {
    return (
      <MenuItem onClick={onClick}>
        <AddCircleOutlineIcon fontSize="small" />
        Other
      </MenuItem>
    );
  };
  
  const SportsSelect = (props) => {
    
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    props.sportType(value)
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOtherSportClick = () => {
      setValue('Other');
      handleClose();
    };
  
    const filteredSports = sports.filter((sport) =>
      sport.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <Select
       
        value={value}
        onChange={handleChange}
        onOpen={handleOpen}
        onClose={handleClose}
        open={open}
        displayEmpty
        renderValue={(selected) => (selected ? selected : 'Select a sport')}
        inputProps={{
          'aria-label': 'Select a sport',
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          getContentAnchorEl: null,
        }}
      >
        <MenuItem disabled>
          <InputIcon fontSize="small"  />
          Search
        </MenuItem>
        <MenuItem>
          <input
            type="text"
            placeholder="Type to search"
            onChange={handleSearch}
          />
        </MenuItem>
        {filteredSports.map((sport) => (
          <MenuItem key={sport.name} value={sport.name}>
            {sport.icon}
            {sport.name}
          </MenuItem>
        ))}
        <OtherSportMenuItem onClick={handleOtherSportClick} />
      </Select>
    );
  };
  
  export default SportsSelect;
 */}

 import * as React from 'react';
 import TextField from '@mui/material/TextField';
 import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';
import { useEffect } from 'react';

 
 const sportsList = [
  { name: 'Soccer' },
  { name: 'Basketball' },
  { name: 'Baseball' },
  { name: 'Tennis' },
  { name: 'Volleyball' },
  { name: 'Hiking' },
  { name: 'Cycling' },
  { name: 'Fitness' },
  { name: 'Swimming' },
  { name: 'Kayaking' },
  { name: 'Football' },
  { name: 'Handball' },
  { name: 'Judo' },
  { name: 'Hockey' },
  { name: 'Esports' },
  { name: 'Running' },
  {name: "Studying"},
  {name: "Other"}

];

 
export default function SportsSelect(props) {
  
  const [selectedValue, setSelectedValue] = useState(null);
  const [label, setLabel] = useState(props.sport ? props.sport : 'Choose activity');


  useEffect(() => {
    setSelectedValue(props.sport); // Set the initial selected value from props
  }, [props.sport]);

  const handleSelectedValueChange = (event, newValue) => {
    if (newValue === null || newValue === undefined) {
      props.sportType("");
      setSelectedValue("") // Set the sport type to an empty value
    } else {
      props.sportType(newValue.name);
      setSelectedValue(newValue.name) // Set the sport type to the selected value's name
    }
  };
  const handleOnFocus = () => {
    setLabel('Choose activity');
  };
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={sportsList}
      sx={{ width:{xs:"100%"}, border:props.missing&&"1px solid red", zIndex:999}}
      getOptionLabel={(option) => option.name} // use the name property of each object
      onChange={handleSelectedValueChange}
      renderInput={(params) => <TextField {...params} label={label} onFocus={handleOnFocus}/>}
       // Use the local state for the selected value
       // Set initial input value to selectedValue.name 
      
    />
  );
}


 