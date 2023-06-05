import React, { useState, useEffect } from 'react';
import {

    Fab,
    Grid
   
  } from "@mui/material";
  import ClearIcon from '@mui/icons-material/Clear';


const FilterTags = (props) => {
    console.log(props)
    let originalFilterTags = props.filterTags
   let filterTags = props.filterTags.slice(0,7)
  if(props.filterTags[8]) filterTags.push("Unlimited")
  if(props.filterTags[9]) filterTags.push("Free")
    if (!props.filterTags[10]) {
       filterTags = filterTags.slice(2);
    } else {
      filterTags[1] = `${props.filterTags[1][0]}-${props.filterTags[1][1]} Ft`;
      
    }

    if (!props.filterTags[7]) {
         filterTags = filterTags.slice(1);
      } else {
         filterTags[0] = `${props.filterTags[0][0]}-${props.filterTags[0][1]} People`;
         
      }
      console.log(filterTags)

      function deleteFilter(i){
        originalFilterTags[i] = ""
        props.setFilters([...originalFilterTags])
      }
    return (
        <Grid width={"100%"} padding={'10px'}  display={'flex'} justifyContent={{md:"center"}} gap={2 }  className='element'
        sx={{   
        
          marginTop:"-15px",
          cursor:"pointer",
          top: 0,
          left: 0,
         
          
          
        
         
        
        }}>
        {props.filterTags
          ? originalFilterTags.map((item, index) => {
              if (item) {
                if([2,3,4].includes(index)){
                return <Fab onClick={()=>deleteFilter(index)}  variant='extended' key={index} sx={{ color: "black",minWidth:"100px", width:"fit-content", whiteSpace:"nowrap", height:"25px", marginBottom:"10px" }}>{item}<ClearIcon/></Fab>;}
                else if(index ===0&& originalFilterTags[7]){
                  return <Fab onClick={()=>deleteFilter(index)}  variant='extended' key={index} sx={{ color: "black",minWidth:"100px", whiteSpace:"nowrap", height:"25px", marginBottom:"10px"  }}>{`${props.filterTags[1][0]}-${props.filterTags[1][1]} Ft`}<ClearIcon/></Fab>;}
                  else if(index ===1&& originalFilterTags[10]){
                    return <Fab onClick={()=>deleteFilter(index)}  variant='extended' key={index} sx={{ color: "black",minWidth:"100px", whiteSpace:"nowrap", height:"25px", marginBottom:"10px"  }}>{`${props.filterTags[0][0]}-${props.filterTags[0][1]} People`}<ClearIcon/></Fab>;} 
                    else if(index ===5){
                      return <Fab onClick={()=>deleteFilter(index)}  variant='extended' key={index} sx={{ color: "black",minWidth:"100px", whiteSpace:"nowrap", height:"25px", marginBottom:"10px"  }}>{`from ${item}`}<ClearIcon/></Fab>;} 
                      else if(index ===6){
                        return <Fab onClick={()=>deleteFilter(index)}  variant='extended' key={index} sx={{ color: "black",minWidth:"100px", whiteSpace:"nowrap", height:"25px", marginBottom:"10px"  }}>{`until ${item}`}<ClearIcon/></Fab>;} 
                        else if(index ===8){
                          return <Fab onClick={()=>deleteFilter(index)}  variant='extended' key={index} sx={{ color: "black",minWidth:"100px", whiteSpace:"nowrap", height:"25px", marginBottom:"10px"  }}>Unlimited<ClearIcon/></Fab>;} 
                          else if(index ===9){
                            return <Fab onClick={()=>deleteFilter(index)}  variant='extended' key={index} sx={{ color: "black",minWidth:"100px", whiteSpace:"nowrap", height:"25px", marginBottom:"10px"  }}>Free<ClearIcon/></Fab>;} 
                            else if(index ===11&&item.length&&originalFilterTags[12]===1){
                              return <Fab onClick={()=>deleteFilter(index)}  variant='extended' key={index} sx={{ color: "black",minWidth:"100px", whiteSpace:"nowrap", height:"25px", marginBottom:"10px"  }}>You are the Organizer<ClearIcon/></Fab>;} 
                              else if(index ===11&&item.length&&originalFilterTags[12]===2){
                                return <Fab onClick={()=>deleteFilter(index)}  variant='extended' key={index} sx={{ color: "black",minWidth:"100px", whiteSpace:"nowrap", height:"25px", marginBottom:"10px"  }}>You Participate<ClearIcon/></Fab>;} 
                        
              }
            })
          : ""}
      </Grid>
    );
  };
  

export default FilterTags;
