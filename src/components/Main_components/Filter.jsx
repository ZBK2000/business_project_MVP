import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import {
  Button,
  Fab,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import VerifyEmail from "../Smaller_Pop_ups/verifyEmail";
import SportsSelect from "../small_components/sportSelect";
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from "@mui/icons-material/Add";
import { useEffect } from "react";
import FilterTags from "../small_components/filterTags";
import ClearIcon from '@mui/icons-material/Clear';
import { motion } from "framer-motion"
import StaticDatePickerCollapsible from "../small_components/NextSevenDay copy";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Filter(props) {
  //declaring states and consts

  const [expanded, setExpanded] = React.useState(false);
  const { user, community, setCommunity } = UserAuth();
  const [verifyEmail, setVerifyEmail] = React.useState(false)

  const [userInfo, setUserInfo] = React.useState("")
  
 
  const id = user ? user.displayName : "";
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
    count,
 
    limited,
    setLimited,
    paid,
    setPaid,    
    participate,
    setParticipate,
    organizing,
    setOrganizing,setCount} = UserAuth()
console.log(sportType)


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
    
      Filtering([location, name, sportType, exactDateFrom, exactDateTo, limited, paid, participate,organizing]);
      setCount(countTruthyValues([location, name, sportType, exactDateFrom, exactDateTo, limited, (paid===0||paid)?true:false]))
      setExpanded(false)
  };


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

  const countTruthyValues = (list) => {
    return list.reduce((count, value) => {
      if (Boolean(value)) {
        return count + 1;
      }
      return count;
    }, 0);
  };
  const clearAll = () => {
  setLocation("")
  setName("")
  setSportType("")
  setExactDateFrom("")
  setExactDateTo("")
  setLimited("")
  setPaid("")
  Filtering("")
  setCount(null)
  setExpanded(false)
  };


console.log(userInfo)
    function findPartcipatedEvents (activated){
      if(activated){
        Filtering([ location, name, sportType, exactDateFrom, exactDateTo, limited, paid,[],[]]);
        setParticipate(prev=>prev=[])
        return
      }
      const pEvents = []
      userInfo.customLinks.map((link, index)=>{
        if(link.slice(-3,-2)[0] != user.displayName){
          pEvents.push(link[0])
          
          
    }})
    setParticipate(pEvents)
    setOrganizing(prev=>prev="")
    Filtering([location, name, sportType, exactDateFrom, exactDateTo, limited, paid,pEvents, []]);
  }
    function findOrganizedEvents (activated){
      console.log(activated)
      if(activated){
        Filtering([ location, name, sportType, exactDateFrom, exactDateTo, limited, paid,[],[]]);
        setOrganizing(prev=>prev="")
        return
      }
      const pEvents = []
      userInfo.customLinks.map((link, index)=>{
        if(link.slice(-3,-2)[0] === user.displayName){
          console.log(link.slice(-3,-2), "jh")
         pEvents.push(link[0])
          
    }})
    setOrganizing(pEvents)
    setParticipate(prev=>prev=[])
    Filtering([ location, name, sportType, exactDateFrom, exactDateTo, limited, paid,[],pEvents]);
    }

    useEffect(() => {
if(expanded){
  document.body.style.overflow = 'hidden';
} else{
  document.body.style.overflow = 'auto';
}
    }, [expanded]);

  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"} alignItems={"center"} maxWidth={"100%"}>
    <Box className="mainPanel" sx={{ margin: "8px", marginBottom:"25px", "& > :not(style)": { m: 1 }, width:"60%",minWidth:"1150px", borderRadius:"30px", display:{md:"flex", xs:"none"}, justifyContent:"center", alignItems:"center", height:"50px" }}>
    <Fab  /*onClick={()=>navigate("/communityEvent")}*/ onClick={user?user.emailVerified?()=>props.setShowEventForm(true):()=>setVerifyEmail(true):()=>props.setShowRegister(true)} margin={"15px !important"} sx={{height:"80%", margin:"10px", backgroundColor:'green',color:"#0BF763", "&:hover":{backgroundColor:'#2f9b14'}}} variant="extended">
        Organize an event <AddIcon sx={{color:"#0BF763"}}/>
      </Fab>
            <Fab variant="extended" onClick={()=>setCommunity(prev=>!prev)}  sx={{height:"80%", margin:"10px",backgroundColor:"#ffffff",color:!community&&"green",width:"170px"}}>Partners {!community&&<CheckCircleOutlineIcon sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'green !important',
          color: 'white !important',
          width: '20px',
          height: '20px',
          minWidth: '0',
          borderRadius: '50%',
          fontSize: '10px',
          fontWeight: 'bold',
          minHeight:'0px'
        }}/>} </Fab>
      

      <Fab  sx={{height:"80%", margin:"10px",backgroundColor:"#ffffff", width:"170px", position:"relative"}} onClick={handleExpandClick} variant="extended">
        Filters {count&&<Fab  disabled  sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'red !important',
          color: 'white !important',
          width: '20px',
          height: '20px',
          minWidth: '0',
          borderRadius: '50%',
          fontSize: '10px',
          fontWeight: 'bold',
          minHeight:'0px'
        }}>{count}</Fab>}
      </Fab>
 
      <Fab margin={"15px !important"} sx={{height:"80%", margin:"10px",backgroundColor:"#ffffff",width:"170px"}} variant="extended" onClick={props.mapViewFunc}>{!props.mapView?"Show map view":"Show detailed view"}</Fab>
     
      
      <Fab margin={"15px !important"} sx={{height:"80%", margin:"10px",backgroundColor:"#ffffff",color:organizing.length>0&&"green",width:"170px"}} variant="extended" onClick={organizing.length?()=>findOrganizedEvents(true): ()=>findOrganizedEvents(false)}>I'm the organizer {organizing.length>0&&<CheckCircleOutlineIcon sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'green !important',
          color: 'white !important',
          width: '20px',
          height: '20px',
          minWidth: '0',
          borderRadius: '50%',
          fontSize: '10px',
          fontWeight: 'bold',
          minHeight:'0px'
        }}/>}</Fab>
      <Fab margin={"15px !important"} sx={{height:"80%", margin:"10px",backgroundColor:"#ffffff",color:participate.length>0&&"green",width:"170px"}} variant="extended" onClick={participate.length?()=>findPartcipatedEvents(true): ()=>findPartcipatedEvents(false)}>I participate
      {participate.length>0&&<CheckCircleOutlineIcon sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'green !important',
          color: 'white !important',
          width: '20px',
          height: '20px',
          minWidth: '0',
          borderRadius: '50%',
          fontSize: '10px',
          fontWeight: 'bold',
          minHeight:'0px'
        }}/>}</Fab>
      </Box>

      <Box className="mainPanel" sx={{ margin: "8px", marginBottom:"25px", "& > :not(style)": { m: 1 }, borderRadius:"30px", display:{md:"none", xs:"flex"},flexDirection:"column", justifyContent:"center", alignItems:"center", width:"100%" }}>
      <Box display={"flex"}>
      <Fab  /*onClick={()=>navigate("/communityEvent")}*/ onClick={user?user.emailVerified?()=>props.setShowEventForm(true):()=>setVerifyEmail(true):()=>props.setShowRegister(true)} margin={"15px !important"} sx={{ margin:"10px",width:"160px", backgroundColor:'green',color:"#0BF763", "&:hover":{backgroundColor:'#2f9b14'}}} variant="extended">
        Organize an event <AddIcon sx={{color:"#0BF763"}}/>
      </Fab>
      <Fab variant="extended" onClick={()=>setCommunity(prev=>!prev)}  sx={{ margin:"10px",backgroundColor:"#ffffff",color:!community&&"green",width:"160px"}}>Partners {!community&&<CheckCircleOutlineIcon sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'green !important',
          color: 'white !important',
          width: '20px',
          height: '20px',
          minWidth: '0',
          borderRadius: '50%',
          fontSize: '10px',
          fontWeight: 'bold',
          minHeight:'0px'
        }}/>} </Fab> 
        </Box>
      <Box display={"flex"}>
        
      <Fab  sx={{ margin:"10px",backgroundColor:"#ffffff", width:"160px"}} onClick={handleExpandClick} variant="extended">
        Filters {count&&<Fab  disabled  sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'red !important',
          color: 'white !important',
          width: '20px',
          height: '20px',
          minWidth: '0',
          borderRadius: '50%',
          fontSize: '10px',
          fontWeight: 'bold',
          minHeight:'0px'
        }}>{count}</Fab>}
      </Fab>
 
      <Fab margin={"15px !important"} sx={{ margin:"10px",backgroundColor:"#ffffff",width:"160px"}} variant="extended" onClick={props.mapViewFunc}>{!props.mapView?"Show map view":"Show detailed view"}</Fab>
      </Box>
      <Box display={"flex"}>
      <Fab margin={"15px !important"} sx={{ margin:"10px",backgroundColor:"#ffffff",color:organizing.length>0&&"green",width:"160px"}} variant="extended" onClick={organizing.length>0?()=>findOrganizedEvents(true): ()=>findOrganizedEvents(false)}>I'm the organizer  {organizing.length>0&&<CheckCircleOutlineIcon sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'green !important',
          color: 'white !important',
          width: '20px',
          height: '20px',
          minWidth: '0',
          borderRadius: '50%',
          fontSize: '10px',
          fontWeight: 'bold',
          minHeight:'0px'
        }}/>}</Fab>
      <Fab margin={"15px !important"} sx={{ margin:"10px",backgroundColor:"#ffffff",color:participate.length>0&&"green",width:"160px"}} variant="extended" onClick={participate.length>0?()=>findPartcipatedEvents(true): ()=>findPartcipatedEvents(false)}>I participate
      {participate.length>0&&<CheckCircleOutlineIcon sx={{
          position: 'absolute',
          top: '0',
          right: '0',
          backgroundColor: 'green !important',
          color: 'white !important',
          width: '20px',
          height: '20px',
          minWidth: '0',
          borderRadius: '50%',
          fontSize: '10px',
          fontWeight: 'bold',
          minHeight:'0px'
        }}/>}</Fab>
      </Box>
      </Box>

      <Box position={"relative"} width={"100%"}>

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
    zIndex: 1060, // Higher z-index to make sure it's above everything else
    
    
  }}><motion.div
  initial={{ opacity: 0, y:500 }}
  animate={{ opacity: 1, y:0 }}
  transition={{ duration: 0.5 }}
  style={{maxHeight:"90%",overflow:"auto",overflowY: "auto",
  overflowX: "hidden"}}>
    <Box sx={{width:{md:"500px",xs:"100%"}, backgroundColor:"white",padding:{md:"10px"},position:"relative",borderRadius:{md:"10px"},}}
    >
     <Button sx={{right:"0%", position:"absolute"}} onClick={()=>setExpanded(false)}><ClearIcon sx={{color:"black"}} /></Button>
        <Box
          sx={{
           
            
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
              <Typography variant="h4" sx={{borderBottom:"1px solid black", width:"100%", textAlign:"center"}}>Filters</Typography>
            </Grid>
            <SportsSelect sportType={setSportType} sport={sportType}/>
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
              
              <Box position={"relative"} width={"100%"}
              >
<Typography>Max participants:</Typography>
<Box display={"flex"}
              alignItems={"center"} gap={1}
              sx={{overflow:"auto", width:"100%"}}
              className="element">
             
              <Button onClick={limited===2?()=>setLimited(false):()=>setLimited(2)} variant="fulfilled" marginBottom={{xs:"50px", md:"5px"}}  sx={{ backgroundColor: limited===2?"#909090":"#d6d6d6", fontWeight: (limited===2)&&"bold", width:'100%'}}>2</Button>
              <Button onClick={limited===4?()=>setLimited(false):()=>setLimited(4)} variant="fulfilled" marginBottom={{xs:"50px", md:"5px"}}  sx={{ backgroundColor: limited===4?"#909090":"#d6d6d6", fontWeight: (limited===4)&&"bold", width:'100%'}}>4</Button>
              <Button onClick={limited===8?()=>setLimited(false):()=>setLimited(8)} variant="fulfilled" marginBottom={{xs:"50px", md:"5px"}}  sx={{ backgroundColor: limited===8?"#909090":"#d6d6d6", fontWeight: (limited===8)&&"bold", width:'100%'}}>8</Button>
              <Button onClick={limited===16?()=>setLimited(false):()=>setLimited(16)} variant="fulfilled" marginBottom={{xs:"50px", md:"5px"}}  sx={{ backgroundColor: limited===16?"#909090":"#d6d6d6", fontWeight: (limited===16)&&"bold", width:'100%'}}>16</Button>
              <Button
              onClick={limited==="unlimited"?()=>setLimited(false):()=>setLimited("unlimited")}
                sx={{ backgroundColor: limited==="unlimited"?"#909090":"#d6d6d6", fontWeight: (limited==="unlimited")&&"bold",width:'100%' }}
                variant="fulfilled"
              >
                Unlimited 
              </Button>
              </Box>
              </Box>
       
           
              
            </Grid>
            <Grid
             item
             
              padding={"0px !important"} xs={12}     display={"flex"}
              gap={3}
              flexDirection={{xs:"column", md:"row"}}
              alignItems={{xs:"center",md:"end"}}
              >
              {" "}

              <Box position={"relative"} width={"100%"}>
              <Typography>Max Price:</Typography>
              <Box  display={"flex"}
              alignItems={"center"}
              gap={1}
              sx={{overflow:"auto", width:"100%"}}
              className="element"
              >
             
              <Button
              
                sx={{ backgroundColor:paid===0?"#909090": "#d6d6d6", fontWeight: paid===0&&"bold" , width:"100%"}}
                
                variant="fulfilled"
                onClick={paid===0?()=>setPaid(false):()=>setPaid(0)}
              >
                Free
              </Button>
              <Button variant="fulfilled" onClick={paid===3000?()=>setPaid(false):()=>setPaid(3000)}  marginBottom={{xs:"25px", md:"5px"}} sx={{ backgroundColor: paid===3000?"#909090": "#d6d6d6" , fontWeight:paid===3000&&"bold", width:"100%"}}>3000Ft</Button>
              <Button variant="fulfilled" onClick={paid===6000?()=>setPaid(false):()=>setPaid(6000)}  marginBottom={{xs:"25px", md:"5px"}} sx={{ backgroundColor: paid===6000?"#909090": "#d6d6d6", fontWeight:paid===6000&&"bold", width:"100%"}}>6000Ft</Button>
              <Button variant="fulfilled" onClick={paid===12000?()=>setPaid(false):()=>setPaid(12000)}  marginBottom={{xs:"25px", md:"5px"}} sx={{ backgroundColor: paid===12000? "#909090": "#d6d6d6", fontWeight:paid===12000&&"bold", width:"100%"}}>12000Ft</Button>
              <Button variant="fulfilled" onClick={paid==='12000+'?()=>setPaid(false):()=>setPaid("12000+")}  marginBottom={{xs:"25px", md:"5px"}} sx={{ backgroundColor: paid==="12000+"? "#909090":"#d6d6d6", fontWeight:paid==="12000+"&&"bold", width:"100%"}}>12000Ft+</Button>
              </Box>
              </Box>
            
            
              
            </Grid>

          
           <Grid
              item
              padding={"3px !important"}
              xs={12}
              
              
              
              sx={{border:"1px solid #d6d6d6", borderRadius:"10px", opacity:props.community?"1":"0.3"}}
              
            >
           
            <Typography width={"fit-content"}>Date:</Typography>
            <Box display={"flex"}
              flexDirection={{ md:"row"}}
              
              alignItems={"center"}
              justifyContent={"center"}
              gap={1}>
            <Typography   >From</Typography>
            <StaticDatePickerCollapsible
                getUpData={setExactDateFrom}
                
              />
              <Typography   >until</Typography>
              <StaticDatePickerCollapsible
                getUpData={setExactDateTo}
                
              />
              </Box>
            </Grid>
            {/*<DateRangePickerValue/>*/}
            <Grid item padding={"0px !important  "} sx={{width:'px'}} xs={12}  >
            <Box  display={"flex"}
              alignItems={"center"}
              flexDirection={{md:"row"}}
              justifyContent={"space-around"}
              marginLeft={"0px"}
              marginBottom={"10px"}
              gap={2}>
  <Fab
                sx={{ backgroundColor: "#ff000097", width:"50%", zIndex:999 }}
                onClick={clearAll}
                variant="extended"
                
              >
               Clear All FIlter
              </Fab>
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
    
      </Box>
    </Box>
  );
}
