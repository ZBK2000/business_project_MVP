import React, { useEffect, useRef, useState } from 'react';
import { Typography, Button, Grid, List, ListItem, ListItemText, Fab, Link } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import { Box } from '@mui/system';
import LoginWithFirebase from '../Forms/loginWithFirebase';
import Header from './Header';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import CopyToClipboardButton from '../small_components/CopyURL';
import { useLocation } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Conversation from '../small_components/ratingSlider copy';
import CancelEvent from '../Smaller_Pop_ups/CancelEvent';
import VerifyEmail from '../Smaller_Pop_ups/verifyEmail';
import { motion } from "framer-motion";
import UserRegisterWithFirebase from '../Forms/UserRegisterWithFirebase';
import ProvideUserName from '../Smaller_Pop_ups/ProvideUserName';
import { toast } from 'react-toastify';
import GoogleMapIndividual from '../small_components/staticGoogleMap';
import MasonryImageList from '../small_components/imagelist';
import Help from './Help';

 export default function CustomLink() {
  const { pathname } = useLocation();
   const {id, hashcode} = useParams()
   const encodedString = encodeURIComponent(`${id}/${hashcode}`);
   const navigate = useNavigate()
    const [linkData, setLinkData] = useState({})
  const [cancelEvent, setCancelEvent] = useState(false)
  const [verifyEmail, setVerifyEmail] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [provideUserName, setProvideUserName] = useState(false)
  const [imageListIndicatior, setImageListIndicatior] = useState(false)
  const [help, setHelp] = useState(false)

  imageListIndicatior
  
   const {user} = UserAuth()
   const constraintsRef = useRef(null);
   
    console.log(id, hashcode, user)
 

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

   async function join(){
     const response = await toast.promise( fetch(`${import.meta.env.VITE_BACKEND_URL}/rightCustomLink`,
        {
        method: "POST",
        body: JSON.stringify({hashcode :hashcode}),
        headers: {
          "Content-Type": "application/json",
        },
    }),{
      pending: 'Please wait',
      
      error: 'Sorry something went wrong, try again'
    } )
        console.log(response)
        const data = await response.json();
        if(!linkData.isLimited){
          if (!data.slots.includes(user.displayName)){
            data.slots.push(user.displayName) }
            else if(data.slots.includes(user.displayName)){
             
              data.slots = data.slots.filter((item) => item !== user.displayName)
            }
        }
        else{if (data.slots.includes("") && !data.slots.includes(user.displayName)){
          data.slots[data.slots.indexOf('')] = user.displayName}
          else if(data.slots.includes(user.displayName)){
            data.slots[data.slots.indexOf(user.displayName)] = ""
          }}

          console.log(data)
          const response2 = await toast.promise( fetch(`${import.meta.env.VITE_BACKEND_URL}/rightCustomLinkUpdate`,
          {
          method: "POST",
          body: JSON.stringify({data: data, user: user.displayName}),
          headers: {
            "Content-Type": "application/json",
          },
      }),{
        pending: 'Please wait',
        success: data.slots.includes(user.displayName)?'Successfuly Joined the Event':"Succesfully left the Event",
        error: data.slots.includes(user.displayName)?'Sorry, your join request were declined':'Sorry, your Leave request were declined'
      }
  )
      
        const newData = await response2.json()
        setLinkData(prev => {
          return {
            ...prev,
            slots: newData.slots
          };
        });
        } 

       
   

   async function leave(){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rightCustomLinkUpdate`,
          {
          method: "POST",
          body: JSON.stringify({data: data, user: user.displayName}),
          headers: {
            "Content-Type": "application/json",
          },
      })
        const newData = await response.json()
   }

 async function openActivity(){
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/openCustomLink`,
        {
        method: "POST",
        body: JSON.stringify({hashcode :hashcode}),
        headers: {
          "Content-Type": "application/json",
        },
    })
        console.log(response)
        const data = await response.json();
        setLinkData(data);
 }

   useEffect(()=>{
    async function getLink(){
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/rightCustomLink`,
        {
        method: "POST",
        body: JSON.stringify({hashcode :hashcode}),
        headers: {
          "Content-Type": "application/json",
        },
    })
        console.log(response)
        const data = await response.json();
        setLinkData(data)
    }
    getLink()
   }, [])
   console.log(linkData)
   const liSlotsList = linkData?.slots ? linkData.slots.map((slot, index) => (
    <ListItem key={index}>
      <PersonIcon sx={{color:"#727272"}} />
      <ListItemText sx={{margin:"0px 10px"}}>{slot}</ListItemText>
    </ListItem>
  )): ""

  const liSlotsList2 = linkData?.slots ? linkData.slots.map((slot, index) => (
    <motion.div style={{height:"30px", display:"flex", justifyContent:"center", alignItems:"center", zIndex:9999, cursor:"pointer"}} drag dragConstraints={constraintsRef} >
   
      <PersonIcon sx={{color:"#727272"}} />
      <Typography sx={{margin:"0px 10px"}}>{slot}</Typography>
    </motion.div>
  )): ""

  console.log(liSlotsList)
  let dateObj
  let now
    if(linkData?.time){
     const baseDate = linkData.time.split(" ")[0] + " "+linkData.time.split(" ")[1].split("-")[0]
     const [date, time] = baseDate.split(' ');
     const [year, month, day] = date.split('-');
     const [hour] = time.split(':');
      dateObj = new Date(year, month - 1, day, hour);
       now = new Date();
      console.log(dateObj,now)
    
    } 
  

    let currentSlide = 0;
  

  function changeSlide(event, plusMinus) {
    event.stopPropagation();
    const slides = document.querySelectorAll(".images");
    let count = 0
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      count ++
    }
    if (currentSlide + plusMinus == -1 ){
      currentSlide = count-1;
      slides[currentSlide].style.display = "block";
    } else if (currentSlide + plusMinus == slides.length ){
      currentSlide = 0;
      slides[currentSlide].style.display = "block";
    }
     else{
      currentSlide = currentSlide + plusMinus;
    slides[currentSlide].style.display = "block";
    }
    
  }

  async function cancelCommunityEvent(id, participants){
    
    const response = await toast.promise(fetch(`${import.meta.env.VITE_BACKEND_URL}/cancelEvent`, {
      method: "POST",
      body: JSON.stringify({ id, participants}),
      headers: {
        "Content-Type": "application/json",
      },
    }),{
      pending: 'Please wait',
      
      error: 'Sorry,'
    })
    const result = await response.json()
    console.log(result)
    if(result.msg ==='Processing completed successfully')
    {console.log("successful delete")}
    toast("Successfully cancelled this event")
   }
   

console.log(linkData)
const count = linkData?.slots? linkData.slots.reduce((acc, curr) => {
  if (curr === "") {
    return acc + 1;
  } else {
    return acc;
  }
}, 0): ""
   
  return (<Grid>
    <Header title="Custom Group" startOfHeader={true} setHelp={setHelp}/>

    <Grid display={"flex"} justifyContent={"center"}>
    <Grid sx={{ 
        display: 'flex',
        flexDirection: 'column',
        width:{md:"1152px", xs:"100%"},
        gap: '16px',
        backgroundColor: 'white',
        borderRadius: '8px',
        margin: "10px"
      }}>
      
        <Typography  variant="h4" component="h1" gutterBottom sx={{ marginTop: '10px', marginBottom:"0px",width:{md:"fit-content",xs:"100%"}, textAlign:"center" }}>
         {linkData.trackName} 
        </Typography>
        {user? user.displayName === linkData.user?<Box sx={{display:{xs:"flex",md:"none"}, gap:1, justifyContent:"center"}}   ><Fab  onClick={()=>setCancelEvent(true)} variant='extended' sx={{color:"black", borderColor:"red",width:"30%", backgroundColor:"#ff00005b", "&:hover":{backgroundColor:"#ff000094"}}}>Cancel event</Fab> 
        { !linkData.isopen? <Fab onClick={openActivity} variant='extended' sx={{color:"black",width:"30%", borderColor:"black"}}>Open activity</Fab>: 
      ""}
      {user?  <CopyToClipboardButton w={30} datetime={linkData.time}/> :""}
        </Box>:
        <Box  sx={{display:{xs:"flex",md:"none"}, gap:1}} >  
      
      {user.displayName === linkData.user ?"":<Fab onClick={user.emailVerified?join:()=>setVerifyEmail(true)} variant="extended" color="primary" sx={{ color:"black",width:"50%", backgroundColor:linkData?.slots?linkData.slots.includes(user.displayName)?"#ff000094":"green":"grey" }}>
        {linkData?.slots ? (linkData.slots.includes(user.displayName) ? "Leave" : "Join") : "error"}
      </Fab>}
      
    <CopyToClipboardButton w={50} datetime={linkData.time}/></Box>:<Box  sx={{display:{xs:"flex",md:"none"}, gap:1}}>  
      
      <Fab onClick={()=>setShowRegister(true)} variant="extended" color="primary" sx={{ color:"black",width:"50%", backgroundColor:linkData?.slots?"green":""  }}>
        {linkData?.slots ?  "Join" : "error"}
      </Fab>
      
    <CopyToClipboardButton w={50} datetime={linkData.time}/></Box>}

        <Box sx={{backgroundColor:"#C8C6C6", borderRadius:"10px", padding:"10px", display:"flex",justifyContent:"space-between", gap:{md:2}, boxShadow:'10px  black'}}>
          <Box sx={{backgroundColor:"#dbdbdb", borderRadius:"10px", padding:"10px", display:"flex", gap:6, color:"grey", width:{md:"40%"}, justifyContent:{xs:"center",md:"none"}}}>
          
        
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent:"center" }}>
          <Box sx={{ display: "grid", gridTemplateColumns: "120px auto", gap: 6 }}>
    <Typography variant="h6" component="h1" gutterBottom>
      Price:
    </Typography>
    <Typography variant="h6" component="h1" gutterBottom className='gradient-heading2' sx={{width:"fit-content", padding:"0px 5px", borderRadius:"10px"}}>
      {linkData?.price?linkData.price?`${linkData.price}Ft`:"FREE":"FREE"}
    </Typography>
  </Box>
  <Box sx={{ display: "grid", gridTemplateColumns: "120px auto", gap: 6 }}>
    <Typography variant="h6" component="h1" gutterBottom>
      Date:
    </Typography>
    <Typography variant="h6" component="h1" gutterBottom>
      {linkData.time}
    </Typography>
  </Box>
  <Box sx={{ display: "grid", gridTemplateColumns: "120px auto", gap: 6 }}>
    <Typography variant="h6" component="h1" gutterBottom>
      Length:
    </Typography>
    <Typography variant="h6" component="h1" gutterBottom>
      {linkData?.lengthOfActivity? linkData.lengthOfActivity? `${linkData.lengthOfActivity}h`:"-":"-"}
    </Typography>
  </Box>
  <Box sx={{ display: "grid", gridTemplateColumns: "120px auto", gap: 6 }}>
    <Typography variant="h6" component="h1" gutterBottom>
      Location:
    </Typography>
    <Typography variant="h6" component="h1" gutterBottom>
      {linkData.location}
    </Typography>
  </Box>
 
  <Box sx={{ display: "grid", gridTemplateColumns: "120px auto", gap: 6 }}>
    <Typography variant="h6" component="h1" gutterBottom>
      Event Type:
    </Typography>
    <Typography variant="h6" component="h1" gutterBottom>
      {linkData.isopen ? "Community" : "Private"}
    </Typography>
  </Box>
  <Box sx={{ display: "grid", gridTemplateColumns: "120px auto", gap: 6 }}>
    <Typography variant="h6" component="h1" gutterBottom>
      Sport Type:
    </Typography>
    <Typography variant="h6" component="h1" gutterBottom>
      {linkData?.sportType ? linkData?.sportType : "undefined"}
    </Typography>
  </Box>
  <Box sx={{ display: "grid", gridTemplateColumns: "120px auto", gap: 6 }}>
    <Typography variant="h6" component="h1" gutterBottom>
      Organizer:
    </Typography>
    <Typography variant="h6" component="h1" gutterBottom>
      {linkData.organizer}
    </Typography>
  </Box>


       
        </Box>
      
        </Box>
        <Box sx={{width:{md:"50%"}, display:{xs:"none", md:"inline"}}}>
        {linkData?.latAndLong?linkData.latAndLong.length?<GoogleMapIndividual coordinates={linkData?.latAndLong ?linkData.latAndLong:[]}/>:linkData?.onlineLink? 
        <Box><Typography variant='h5'>Link:</Typography>
        <Link sx={{color:"black", cursor:"pointer", fontSize:"22px"}}>{linkData.onlineLink}</Link></Box>:"":""}
        
        </Box>

        {user? user.displayName === linkData.user?<Box sx={{display:{md:"flex",xs:"none"}, gap:1}}  flexDirection={"column"} ><Fab  onClick={()=>setCancelEvent(true)} variant='extended' sx={{color:"black", borderColor:"red",width:"150px", backgroundColor:"#ff00005b", "&:hover":{backgroundColor:"#ff000094"}}}>Cancel event</Fab> 
        { !linkData.isopen? <Fab onClick={openActivity} variant='extended' sx={{color:"black", borderColor:"black"}}>Open activity</Fab>: 
      ""}
      {user?  <CopyToClipboardButton datetime={linkData.time}/> :""}
        </Box>:
        <Box  sx={{display:{md:"flex",xs:"none"}, gap:1}} flexDirection={"column"}>  
      <Box display={"flex"} gap={3}>
      {user.displayName === linkData.user ?"":<Fab onClick={user.emailVerified?join:()=>setVerifyEmail(true)} variant="extended" color="primary" sx={{color:"black",width:"150px", backgroundColor:linkData?.slots?linkData.slots.includes(user.displayName)?"#ff000094":"green":"grey" }}>
        {linkData?.slots ? (linkData.slots.includes(user.displayName) ? "Leave" : "Join") : "error"}
      </Fab>}
      
    </Box><CopyToClipboardButton datetime={linkData.time}/></Box>:
     <Box  sx={{display:{md:"flex",xs:"none"}, gap:1}} flexDirection={"column"}>  
     <Box display={"flex"} gap={3}>
     <Fab onClick={()=>setShowRegister(true)} variant="extended" color="primary" sx={{ width: '100px',color:"black",width:"150px", backgroundColor:linkData?.slots?"green":"" }}>
       {linkData?.slots ?  "Join" : "error"}
     </Fab>
     
   </Box><CopyToClipboardButton datetime={linkData.time}/></Box> }
      
   
      
      
        </Box>

        <Box sx={{display:{md:"none"}}}>
        {linkData?.latAndLong? linkData.latAndLong.length?<GoogleMapIndividual coordinates={linkData?.latAndLong ?linkData.latAndLong:[]}/>:linkData?.onlineLink? 
       <Box padding={"20px"}><Typography variant='h5'>Link:</Typography>
       <Link sx={{color:"black", cursor:"pointer", fontSize:"22px"}}>{linkData.onlineLink}</Link></Box>:"":""}
        </Box>

        <Box display={{md:"flex"}}>
        <Box sx={{borderRadius:{md:"10px 0px 0px 10px",xs:"10px 10px 0px 0px"}, padding:"20px",paddingTop:"5px",border: '1px solid #dbdbdb', width:{md:"75%"}, overflow:"auto", height:"300px"}}>
        <Typography variant='h5' sx={{borderBottom: '1px solid #dbdbdb'}}>
        Description of the event:
       </Typography>
        <Typography variant='h6' marginTop={"5px"}sx={{whiteSpace: 'pre-wrap',color:"grey"}} >
        {linkData.description}
       </Typography>
        </Box>
        <Box className="element" sx={{border: '1px solid #dbdbdb', borderRadius:{md:"0px 10px 10px 0px",xs:"0px 0px 10px 10px"}, width:{md:"50%"}, height:"325px",maxHeight:"350px", overflow:"auto"}}>
          <Typography variant='h5' sx={{margin:"20px"}}>Participants <span className='gradient-heading2' style={{borderRadius:"10px", padding:"4px", whiteSpace:"nowrap"}}>{linkData.isLimited?`${count} place remaining`:"Unlimited"}</span></Typography>
        <List sx={{ listStyle: 'none', margin: '0', padding: '0', maxHeight:"250px", overflow:"auto", width:"100%", borderTop:"1px solid #dbdbdb"}}>
          { liSlotsList }
        </List>
      {!linkData.isLimited && <Typography sx={{margin:"20px"}}><AddIcon/><PersonIcon/></Typography>}
        </Box>
        </Box>
      
       
        
         
      
      
   
<Box  justifyContent={"space-between"} sx={{display:"flex", flexDirection:{md:"row", xs:"column"},gap:{xs:1, md:0}, alignItems:"center"}}>
<Conversation _id={linkData._id}/> 
        <div className="example-container">

   
     {/*<>
      <motion.div className="drag-area" ref={constraintsRef} style={{border:"1px solid #dbdbdb", borderRadius:"10px", boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.3)',}} >

      
      
          { liSlotsList2 }
      </motion.div>
        
</>*/}
     </div>

        <Grid
              minWidth={"50%"}
              maxWidth={"600px"}
              maxHeight={"300px"}
              height={"300px"}
              item
              xs={12}
              sm={10}
              md={8}
              lg={8}
              xl={4}
              className="slider"
              onClick={()=>setImageListIndicatior(true)}
              sx={{padding:"0px !important", margin:{md:"10px 0px 10px 10px",xs:"0px"}, minWidth:{md:"50%", xs:'100%'}, display:"flex", alignItems:"center"}}
              
            >
              {linkData?.img_urls ? <Box> {Array.from({ length: linkData.img_urls.length}, (_, i) => (
                <img
                  key={i}
                  
                  src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${linkData._id}&number=${i}&event=${true}`}
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
            
                  }}
                  className="images slide"
                  alt="image"
                />
              ))}
                    {(linkData?.img_urls ? linkData?.img_urls.length: 0) ==0 ?"":        <ArrowForwardIosIcon onClick={(e)=>changeSlide(e, 1)} sx={{position:"absolute",  left: "85%",
  bottom: "45%", fontSize:"45px", color:"#f5f5f5", "&:hover":{ fontSize:"50px", color:"#d1d1d1"}}} />}
   {(linkData?.img_urls ? linkData?.img_urls.length: 0) ==0 ?"":   <ArrowBackIosNewIcon onClick={(e)=>changeSlide(e,-1)} sx={{position:"absolute",  right: "85%",
  bottom: "45%", fontSize:"45px", color:"#f5f5f5", "&:hover":{ fontSize:"50px", color:"#d1d1d1"}}} />}  </Box> :""}
            
  {(linkData?.img_urls ? linkData?.img_urls.length: 0) ==0 ? <Typography variant='h6' textAlign={"center"} width={'100%'}>There is no image provided for this activity :(</Typography>:''}
            </Grid>

            </Box>
         
      </Grid>
      
      </Grid>
     {cancelEvent && <CancelEvent indicator={setCancelEvent} cancelCommunityEvent={cancelCommunityEvent} id={linkData._id} participants={linkData.slots}/>}
     {verifyEmail && <VerifyEmail indicator={setVerifyEmail}/>}
     {showLogin &&<LoginWithFirebase indicator={setShowLogin}/>} 
     {showRegister &&<UserRegisterWithFirebase indicator={setShowRegister} indicatorforLogin={setShowLogin} setProvideUserName={setProvideUserName}/>}
     {provideUserName && <ProvideUserName indicator={setProvideUserName}/>}
     
   {imageListIndicatior&&<MasonryImageList imgs={linkData?.img_urls?linkData.img_urls:"no imgage"} _id={linkData._id} indicator={setImageListIndicatior}/>}
   {help &&<Help indicator={setHelp}/>} 
      
      </Grid>
  );
}

