import React from 'react';
import {

  Box,
    Fab,
    Grid
   
  } from "@mui/material";
  import ClearIcon from '@mui/icons-material/Clear';
import { UserAuth } from '../../context/AuthContext';
import { useEffect } from 'react';


const FilterTags = (props) => {

  
  const {Filtering, filterItems,
    location,
    setLocation,
    name,
    setName,
    sportType,
    setSportType,
    exactDateFrom,
    setExactDateFrom,
    exactDateTo,
    setExactDateTo,
    limited,
    setLimited,
    paid,
    setPaid,
    participate,
    setParticipate,
    organizing,
    setOrganizing,} = UserAuth()


    useEffect(() => {
      Filtering( [ location,
       name,
       sportType,
       exactDateFrom,
       exactDateTo,
       limited,
       paid,
       participate,
       organizing,
     ])
     },  [ location,
       name,
       sportType,
       exactDateFrom,
       exactDateTo,
       limited,
       paid,
       participate,
       organizing,
     ])
   
    return (
        <Grid width={"100%"} padding={'10px'}  display={'flex'} justifyContent={{md:"center"}} gap={2 }  className='element'
        sx={{   
        
          marginTop:"-15px",
          cursor:"pointer",
          top: 0,
          left: 0,
         
          
          
        
         
        
        }}>
          {filterItems&&<Box>
   {location&&<Fab onClick={()=>setLocation("")}  variant='extended'  sx={{ color: "black",minWidth:"100px", width:"fit-content", whiteSpace:"nowrap", height:"25px", marginBottom:"10px" }}>{location}<ClearIcon/></Fab>}
   {name&&<Fab onClick={()=>setName("")}  variant='extended'  sx={{ color: "black",minWidth:"100px", width:"fit-content", whiteSpace:"nowrap", height:"25px", marginBottom:"10px" }}>{name}<ClearIcon/></Fab>}
   {sportType&&<Fab onClick={()=>setSportType("")}  variant='extended'  sx={{ color: "black",minWidth:"100px", width:"fit-content", whiteSpace:"nowrap", height:"25px", marginBottom:"10px" }}>{sportType}<ClearIcon/></Fab>}
   {limited&&<Fab onClick={()=>setLimited(false)}  variant='extended'  sx={{ color: "black",minWidth:"100px", width:"fit-content", whiteSpace:"nowrap", height:"25px", marginBottom:"10px" }}>{limited} participants<ClearIcon/></Fab>}
   {paid&&<Fab onClick={()=>setPaid(false)}  variant='extended'  sx={{ color: "black",minWidth:"100px", width:"fit-content", whiteSpace:"nowrap", height:"25px", marginBottom:"10px" }}>{paid} Ft<ClearIcon/></Fab>}
   {exactDateFrom&&<Fab onClick={()=>setExactDateFrom("")}  variant='extended' sx={{ color: "black",minWidth:"100px", width:"fit-content", whiteSpace:"nowrap", height:"25px", marginBottom:"10px" }}>From {exactDateFrom}<ClearIcon/></Fab>}
   {exactDateTo&&<Fab onClick={()=>setExactDateTo("")}  variant='extended'  sx={{ color: "black",minWidth:"100px", width:"fit-content", whiteSpace:"nowrap", height:"25px", marginBottom:"10px" }}>Until {exactDateTo}<ClearIcon/></Fab>}
   {organizing.length>0&&<Fab onClick={()=>setOrganizing([])}  variant='extended'  sx={{ color: "black",minWidth:"100px", width:"fit-content", whiteSpace:"nowrap", height:"25px", marginBottom:"10px" }}>You are The Organizer<ClearIcon/></Fab>}
   {participate.length>0&&<Fab onClick={()=>setParticipate([])}  variant='extended'  sx={{ color: "black",minWidth:"100px", width:"fit-content", whiteSpace:"nowrap", height:"25px", marginBottom:"10px" }}>You are a participant<ClearIcon/></Fab>}</Box>}
   
      </Grid>
    );
  };
  

export default FilterTags;
