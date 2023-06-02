import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  Button,
  Collapse,
  Fab,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { margin } from "@mui/system";
import TelegramIcon from '@mui/icons-material/Telegram';
import { UserAuth } from "../context/AuthContext";
import VerifyEmail from "./verifyEmail";
import Sports from "./sportIcons";
import SportsSelect from "./sportSelect";
import StaticDatePickerCollapsible from "./NextSevenDay copy";
import zIndex from "@mui/material/styles/zIndex";
import DateRangePickerValue from "./DateRange";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import FilterTags from "./filterTags";
import DateRangePicker from "./Daterangepicker";
import DateRangePicker2 from "./Daterangepicker";
import DateRangePickerNew from "./Daterangepicker";
import ClearIcon from '@mui/icons-material/Clear';
import { motion } from "framer-motion"

export default function Filter(props) {
  //declaring states and consts
  const [value, setValue] = React.useState([0, 20]);
  const [value2, setValue2] = React.useState([0, 30000]);
  const [location, setLocation] = React.useState("");
  const [name, setName] = React.useState("");
  const [expanded, setExpanded] = React.useState(false);
  const { user } = UserAuth();
  const [verifyEmail, setVerifyEmail] = React.useState(false)
  const [sportType,setSportType] = React.useState("")
  const [exactDateFrom, setExactDateFrom] = React.useState("")
  const [exactDateTo, setExactDateTo] = React.useState("")
  const [free, setFree] = React.useState(false)
  const [limited, setLimited] = React.useState(false)
  const [paid, setPaid] = React.useState(false)
  const [unlimited, setUnlimited] = React.useState(false)
  const [userInfo, setUserInfo] = React.useState("")
  const [participate, setParticipate] = React.useState([])
  const [organizing, setOrganizing] = React.useState([])
  const [exactDate, setExactDate] = React.useState("")
  const id = user ? user.displayName : "";

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 20,
      label: "20",
    },
  ];

  //declaring the statemanagers for the input fields
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };
  const handleExpandClick = (e) => {
    if (e.target === e.currentTarget) {
    setExpanded(!expanded);}
  };
  const getUpData = () => {
    
      props.getUpData([value, value2, location, name, sportType, exactDateFrom, exactDateTo, limited,unlimited,free, paid, organizing.length?organizing:participate.length?participate:[],  organizing.length?1:participate.length?2:3]);
    
  };
  useEffect(() => {
    if(props.filterItems){
  if(!props.filterItems[11].length){
    setOrganizing([])
    setParticipate([])
  }
  }},  [props.filterItems])

  useEffect(() => {
    async function fetching_user() {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user`, {
        method: "POST",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setUserInfo(data)
    }
  fetching_user()},  [user])
console.log(userInfo)
    function findPartcipatedEvents (){
      const pEvents = []
      userInfo.customLinks.map((link, index)=>{
        if(link.slice(-3,-2)[0] != user.displayName){
          pEvents.push(link[0])
          
          
    }})
    setParticipate(pEvents)
    setOrganizing(prev=>prev=[])
    props.getUpData([value, value2, location, name, sportType, exactDateFrom, exactDateTo, limited,unlimited,free, paid,pEvents,2]);
  }
    function findOrganizedEvents (){
      const pEvents = []
      userInfo.customLinks.map((link, index)=>{
        if(link.slice(-3,-2)[0] === user.displayName){
          console.log(link.slice(-3,-2), "jh")
         pEvents.push(link[0])
          
    }})
    setOrganizing(pEvents)
    setParticipate(prev=>prev=[])
    props.getUpData([value, value2, location, name, sportType, exactDateFrom, exactDateTo, limited,unlimited,free, paid,pEvents,1]);
    }

  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"} maxWidth={"100%"}>
    <Box className="mainPanel" sx={{ margin: "8px", marginBottom:"25px", "& > :not(style)": { m: 1 }, width:"50%",minWidth:"1030px", borderRadius:"30px", display:{md:"flex", xs:"none"}, justifyContent:"center", alignItems:"center", height:"50px" }}>
        
      <Fab  sx={{height:"80%", margin:"10px",backgroundColor:"#ffffff", width:"170px"}} onClick={handleExpandClick} variant="extended">
        Filters 
      </Fab>
 
      <Fab margin={"15px !important"} sx={{height:"80%", margin:"10px",backgroundColor:"#ffffff",width:"170px"}} variant="extended" onClick={props.mapViewFunc}>{!props.mapView?"Show map view":"Show detailed view"}</Fab>
      <Fab  /*onClick={()=>navigate("/communityEvent")}*/ onClick={user?user.emailVerified?()=>props.setShowEventForm(true):()=>setVerifyEmail(true):()=>props.setShowRegister(true)} margin={"15px !important"} sx={{height:"80%", margin:"10px", backgroundColor:'green',color:"#0BF763", "&:hover":{backgroundColor:'#2f9b14'}}} variant="extended">
        Organize an event <AddIcon sx={{color:"#0BF763"}}/>
      </Fab>
      
      <Fab margin={"15px !important"} sx={{height:"80%", margin:"10px",backgroundColor:"#ffffff",width:"170px"}} variant="extended" onClick={findOrganizedEvents}>I'm the organizer</Fab>
      <Fab margin={"15px !important"} sx={{height:"80%", margin:"10px",backgroundColor:"#ffffff",width:"170px"}} variant="extended" onClick={findPartcipatedEvents}>I participate</Fab>
      </Box>

      <Box className="mainPanel" sx={{ margin: "8px", marginBottom:"25px", "& > :not(style)": { m: 1 }, borderRadius:"30px", display:{md:"none", xs:"flex"},flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%" }}>
      <Fab  /*onClick={()=>navigate("/communityEvent")}*/ onClick={user?user.emailVerified?()=>props.setShowEventForm(true):()=>setVerifyEmail(true):()=>props.setShowRegister(true)} margin={"15px !important"} sx={{ margin:"10px", backgroundColor:'green',color:"#0BF763", "&:hover":{backgroundColor:'#2f9b14'}}} variant="extended">
        Organize an event <AddIcon sx={{color:"#0BF763"}}/>
      </Fab>
      <Box display={"flex"}>
      <Fab  sx={{ margin:"10px",backgroundColor:"#ffffff", width:"160px"}} onClick={handleExpandClick} variant="extended">
        Filters 
      </Fab>
 
      <Fab margin={"15px !important"} sx={{ margin:"10px",backgroundColor:"#ffffff",width:"160px"}} variant="extended" onClick={props.mapViewFunc}>{!props.mapView?"Show map view":"Show detailed view"}</Fab>
      </Box>
      <Box display={"flex"}>
      <Fab margin={"15px !important"} sx={{ margin:"10px",backgroundColor:"#ffffff",width:"160px"}} variant="extended" onClick={findOrganizedEvents}>I'm the organizer</Fab>
      <Fab margin={"15px !important"} sx={{ margin:"10px",backgroundColor:"#ffffff",width:"160px"}} variant="extended" onClick={findPartcipatedEvents}>I participate</Fab>
      </Box>
      </Box>

      <Box>

     {expanded&& <Box  onClick={(e)=>handleExpandClick(e)} sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin:'0px !important',
    bgcolor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity
    display: 'flex',
    alignItems: {md:'center',xs:"flex-end"},
    justifyContent: 'center',
    zIndex: 9999, // Higher z-index to make sure it's above everything else
    
    
  }}><motion.div
  initial={{ opacity: 0, y:500 }}
  animate={{ opacity: 1, y:0 }}
  transition={{ duration: 0.5 }}
  style={{maxHeight:"90%",overflow:"auto",overflowY: "auto",
  overflowX: "hidden"}}>
    <Box sx={{width:{md:"500px",xs:"100%"}, backgroundColor:"white",padding:{md:"10px"},position:"relative"}}
    >
     <Button sx={{right:"0%", position:"absolute"}} onClick={()=>setExpanded(false)}><ClearIcon sx={{color:"black"}} /></Button>
        <Box
          sx={{
           
            marginBottom: "10px",
            width: { xs:"100%"},
            display:"flex",
            
            justifyContent: "center",
            alignItems: "center",

            
            paddingTop:"40px",
          
          
  /* Use transform instead of left for smooth sliding effect */
  zIndex: 999,
 
          }}
        >
          <Grid container marginLeft={{xs:"3px"}}  spacing={4} width={"90%"}  display={"flex"} justifyContent={{md:"left", xs:"center"}} alignItems={"center"} gap={3} >
          <Grid
              item
              
              padding={"0px !important"}
              xs={12}
              
              display={"flex"}
              alignItems={{xs:"center",md:"end"}}
              justifyContent={"center"}
              gap={3}
              flexDirection={{xs:"column", md:"row"}}
              
              
            >
              <Typography variant="h4" sx={{borderBottom:"1px solid black"}}>Filters</Typography>
            </Grid>
            <Grid
              item
              
              padding={"0px !important"}
              xs={12}
              
              display={"flex"}
              alignItems={{xs:"center",md:"end"}}
              justifyContent={"center"}
              gap={3}
              flexDirection={{xs:"column", md:"row"}}
              
              
            >
              <Box display={"flex"}
              alignItems={"center"} flexDirection={{md:"column"}} gap={1}
              >

             
              <Button
              onClick={()=>setUnlimited(prev=>!prev)}
                sx={{ backgroundColor: unlimited &&props.community?"#909090":"#d6d6d6", fontWeight: unlimited&&props.community&&"bold",width:'100%' }}
                disabled={!props.community}
                variant="fulfilled"
              >
                Unlimited <PersonIcon sx={{color: !unlimited&&"#aeaeae"}}/>
              </Button>
              <Button onClick={()=>setLimited(prev=>!prev)} variant="fulfilled" marginBottom={{xs:"50px", md:"5px"}}  sx={{ backgroundColor: limited?"#909090":"#d6d6d6", fontWeight: (limited)&&"bold", width:'100%'}}>limited {"  "}<PersonIcon sx={{color: !limited&&"#aeaeae"}} /></Button>
              </Box>
       
            
              <Slider
                 sx={{ margin: "0px", opacity:limited?"1":"0.3" }}
                disabled={!limited?true:false}
                min={0}
                max={20}
                getAriaLabel={() => "Temperature range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"

                //getAriaValueText={valuetext}
              />
              
            </Grid>
            <Grid
             item
             
              padding={"0px !important"} xs={12}     display={"flex"}
              gap={3}
              flexDirection={{xs:"column", md:"row"}}
              alignItems={{xs:"center",md:"end"}}
              >
              {" "}
              <Box marginLeft={"20px"} display={"flex"}
              alignItems={"center"}
              flexDirection={{md:"column"}} gap={1}
              
              >
             
              <Button
              
                sx={{ backgroundColor:(free)?"#909090": "#d6d6d6", fontWeight: (free)&&"bold" , width:"100%"}}
                
                variant="fulfilled"
                onClick={()=>setFree(prev=>!prev)}
              >
                Free
              </Button>
              <Button variant="fulfilled" onClick={()=>setPaid(prev=>!prev)} disabled={props.community?true:false} marginBottom={{xs:"25px", md:"5px"}} sx={{ backgroundColor: !paid||props.community? "#d6d6d6": "#909090", fontWeight:paid&&!props.community&&"bold", width:"100%"}}>Priced</Button>
              </Box>
              {" "}
              <Slider
               disabled={props.community || !paid?true:false}
                sx={{ margin: "0px", opacity:props.community||!paid?"0.3":"1" }}
                min={0}
                max={30000}
                step={100}
                getAriaLabel={() => "Temperature range"}
                value={value2}
                onChange={handleChange2}
                valueLabelDisplay="on"
                //getAriaValueText={valuetext}
              />
              
            </Grid>

            <Grid
              item
              padding={"0px !important"}
              xs={12}
              
              
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-around"}
              gap={1}
            >
              <TextField
                sx={{
                  color: "#3c3c3c",
                  "& .input:focus !important": { color: "#3c3c3c" },
                  zIndex:999
                  ,width:{md:"48%"}
                }}
                id="outlined-basic"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                label="City"
                variant="filled"
              />
            
           
              <TextField
                sx={{
                  color: "#3c3c3c",
                  "& .input:focus !important": { color: "#3c3c3c" },
                  zIndex: 999
                }}
                id="outlined-basic"
                onChange={(e) => setName(e.target.value)}
                value={name}
                label="Name"
                variant="filled"
              />
           </Grid>
            <SportsSelect sportType={setSportType}/>
           <Grid
              item
              padding={"3px !important"}
              xs={7.8}
              
              
              display={"flex"}
              flexDirection={{xs:"column", md:"row"}}
              gap={{md:1}}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{border:"1px solid #d6d6d6", borderRadius:"10px", opacity:props.community?"1":"0.3"}}
              
            >
           
            <Typography width={"fit-content"}>Date:</Typography>
            
            <Typography   >From</Typography>
            <TextField
            
                sx={{
                  color: "#3c3c3c",
                  "& .input:focus !important": { color: "#3c3c3c" },
                  
                }}
                id="outlined-basic"
                onChange={(e) => setExactDateFrom(e.target.value)}
                value={exactDateFrom}
                label="yyyy-mm-dd"
                variant="filled"
              />
              <Typography   >until</Typography>
            <TextField
            
                sx={{
                  color: "#3c3c3c",
                  "& .input:focus !important": { color: "#3c3c3c" },
                 
                }}
                id="outlined-basic"
                onChange={(e) => setExactDateTo(e.target.value)}
                value={exactDateTo}
                label="yyyy-mm-dd"
                variant="filled"
              />
            </Grid>
            {/*<DateRangePickerValue/>*/}
            <Grid item padding={"0px !important  "} sx={{width:'px'}} xs={12}  >
            <Box  display={"flex"}
              alignItems={"center"}
              flexDirection={{xs:"column", md:"row"}}
              justifyContent={"space-around"}
              marginLeft={"0px"}>

            <Fab
                sx={{ backgroundColor: "#d6d6d6", width:"50%", zIndex:999 }}
                onClick={getUpData}
                variant="extended"
                
              >
               Apply Filter
              </Fab>
            
             
             
            </Box>
            </Grid>
          </Grid>
        </Box>
     
      </Box></motion.div>
    </Box>}
      {verifyEmail && <VerifyEmail indicator={setVerifyEmail}/>}
      <FilterTags filterTags={props.filterItems} setFilters={props.getUpData}/>
      </Box>
    </Box>
  );
}
