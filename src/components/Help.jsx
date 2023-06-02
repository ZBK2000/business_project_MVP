import { Box, Button, Grid, Typography } from "@mui/material";
import Header from "./Header";

import { useState } from "react";
import { motion } from "framer-motion"
import ClearIcon from '@mui/icons-material/Clear';

export default function Help (props){
    
    return(
        <Box  onClick={()=>props.indicator(false)} sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin:'0px !important',
            bgcolor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999, // Higher z-index to make sure it's above everything else
            
            
          }}>
              <motion.div
    initial={{ opacity: 0, scale:0.5 }}
    animate={{ opacity: 1, scale:1 }}
    transition={{ duration: 0.5 }}
    style={{maxHeight:"95%", overflow:"auto"}}>
            <Box sx={{width:{md:"800px",xs:"100%"}, backgroundColor:"white", borderRadius:"10px", overflow:"auto", position:"relative"}}
            >
         <Button sx={{right:"0%", position:"absolute"}} onClick={()=>props.indicator(false)}><ClearIcon sx={{color:"black"}} /></Button>
            <Grid maxWidth={"650px"} borderRadius={"15px"} sx={{backgroundColor:"#ffffff", margin:"15px", padding:"15px"}} >
        <Typography margin={"10px"} variant="h4">Hi, welcome here on Sport Together</Typography>
        <Typography margin={"10px"} variant="h5">We aim to provide companion for any kind of activity and bring people together</Typography>
        <hr/>
        <Typography margin={"10px"}  variant="h6">You can organize any kind of activity here</Typography>
        <Typography margin={"10px"}  variant="h6">You can specify the number of participants, the location, the type of activity and many more</Typography>
        <hr />
        <Typography margin={"10px"}  variant="h6">You can also decide to open your activity for anybody or just organize a closed event with your friends</Typography>
        <Typography margin={"10px"}  variant="h6">You will need to register an account - which is totally free - to organize or participate in activites</Typography>
        <hr />
        <Typography margin={"10px"}  variant="h6"></Typography>
        <Typography margin={"10px"}  variant="h6">Right now we cannot handle payments on our site, thats said you can organize paid events, but you will have to handle the payments</Typography>
        <hr />
        <Typography margin={"10px"}  variant="h6"></Typography>
        <Typography margin={"10px"}  variant="h6">If you have any question or suggestion, please contact us businessTest@outlook.hu</Typography>
        </Grid>
        </Box>
        </motion.div>
        </Box>
    )
}

