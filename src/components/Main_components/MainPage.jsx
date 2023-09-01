import Header from "./Header";
import {  useNavigate } from "react-router-dom";
import { useState } from "react";


import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Filter from "./Filter";
import { useEffect } from "react";
import { useTheme } from "@emotion/react";
import { UserAuth } from "../../context/AuthContext";
import { Box, Fab, Grid } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useMemo } from "react";
import Sports from "../small_components/sportIcons";
import MapContainer from "./GoogleMapAll";
import LoginWithFirebase from "../Forms/loginWithFirebase";
import CommunityEvent from "../Forms/communityEventForm";
import UserRegisterWithFirebase from "../Forms/UserRegisterWithFirebase";
//import InfiniteScroll from "./infiniteScroll";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
import Loading from "../small_components/loading";
import { useRef } from "react";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SportsVolleyballIcon from "@mui/icons-material/SportsVolleyball";
import HikingIcon from "@mui/icons-material/Hiking";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";
import KayakingIcon from "@mui/icons-material/Kayaking";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SchoolIcon from "@mui/icons-material/School";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Help from "./Help";


const sportsIcons = [
  { name: "Soccer", icon: <SportsSoccerIcon /> },
  { name: "Tennis", icon: <SportsTennisIcon /> },
  { name: "Volleyball", icon: <SportsVolleyballIcon /> },
  { name: "Hiking", icon: <HikingIcon /> },
  { name: "Cycling", icon: <DirectionsBikeIcon /> },
  { name: "Fitness", icon: <FitnessCenterIcon /> },
  { name: "Swimming", icon: <PoolIcon /> },
  { name: "Canoeing", icon: <KayakingIcon /> },
  { name: "Basketball", icon: <SportsBasketballIcon /> },
  { name: "Football", icon: <SportsFootballIcon /> },
  { name: "Handball", icon: <SportsHandballIcon /> },
  { name: "Judo", icon: <SportsMartialArtsIcon /> },
  { name: "Hockey", icon: <SportsHockeyIcon /> },
  { name: "Esports", icon: <SportsEsportsIcon /> },
  { name: "Baseball", icon: <SportsBaseballIcon /> },
  { name: "Studying", icon: <SchoolIcon /> },
  { name: "Running", icon: <DirectionsRunIcon /> },
];

export default function MainPage(props) {
  //declaring states and consts
  const { user } = UserAuth();
  const nameOfUser = user ? user.displayName : "";
  const theme = useTheme();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  //const [filterItems, setFilterItems] = useState("");
  const [heart, setHeart] = useState();
  //let heartList= useMemo(()=>[], [])
  const [heartList, setHeartList] = useState([]);
  const [favouriteData, setfavouriteData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [mapView, setMapView] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [showEventForm, setShowEventForm] = useState(false);
  const [currentSport, setCurrentSport] = useState("");

  const [isMoreLink, setIsMoreLink] = useState(true);
  const [isMoreTrack, setIsMoreTrack] = useState(true);
  const [newFilterSet, setNewFilterSet] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const { community, setCommunity } = UserAuth();
 



  const [help, setHelp] = useState(false);
  const isFirstRender = useRef(true);
  const {Filtering, filterItems} = UserAuth()

  function mapViewFunc() {
    setMapView((prev) => !prev);
  }

  let filteredData = [];
 
  console.log(props.allLinks);
  //let filteredDataCommunity=useMemo(()=>[], [])
  let filteredDataCommunity = [];
  
  let allLocation2 = [];
  console.log(filteredDataCommunity.length, filteredDataCommunity);
  const validLinks =
    filteredDataCommunity === "empty"
      ? []
      : filteredDataCommunity.length > 0
      ? filteredDataCommunity
      : props.allLinks;
  let activityCounter = 0;
  console.log(validLinks, props.allLinks);

  const liveActivities = props.allLinks.map(function (item, index) {
    
    if (item.isopen || !item.isopen) {
      
      const date_components = item.time.split(" ") ;
      const date = date_components[0];
      const time_interval = date_components[1];

      // Extract the start time and end time from the time interval
      let [start_time, end_time] = time_interval.split("-").map(Number);
      start_time = String(start_time).padStart(2, "0");
      const current_datetime = new Date();
      current_datetime.setDate(current_datetime.getDate() + 5);
      console.log(current_datetime);
      // Convert the date and time components to Date objects
      const activity_start_datetime = new Date(`${date}T${start_time}:00:00`);
      const foundItem = sportsIcons.find(
        (item1) => item1.name === item.sportType
      );
      // if (activity_start_datetime >= current_datetime) {
      if ((currentSport == item.sportType) | !currentSport) {
        const count = item.slots.reduce((acc, curr) => {
          if (curr === "") {
            return acc + 1;
          } else {
            return acc;
          }
        }, 0);
        activityCounter++;
        if (item.latAndLong) {
          try {
            // Check if latAndLong already exists in allLocation2
            const existingLocation = allLocation2.find(location => location[0][0] === item.latAndLong[0] && location[0][1] === item.latAndLong[1]);
        
            if (existingLocation) {
              // Add item._id and item.trackName to the existing location
              existingLocation[1].push(item._id);
              existingLocation[2].push(item.trackName);
            } else {
              // Create a new entry for latAndLong
              allLocation2.push([item.latAndLong, [item._id], [item.trackName]]);
            }
          } catch (error) {
            console.log(error);
          }
        }

        return (
          <Grid
            item
            padding={"8px !important"}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={2.4}
            key={item._id}
            sx={{ cursor: "pointer" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                className="tracks"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  margin: "auto",
                  position: "relative",
                  border: user
                    ? item.organizer === user.displayName
                      ? "1px solid green"
                      : item.slots.includes(user.displayName)
                      ? "1px solid orange"
                      : ""
                    : "",
                }}
                onClick={
                
                     () => navigate(`/tracks/${item.name}/${item._id}`)
                    
                }
              >
                {activity_start_datetime <= current_datetime && (
                  <Box
                    sx={{
                      position: "absolute",
                      color: "#fb7b7b",
                      left: "0%",
                      top: "50%",
                      borderRadius: "0px 10px 10px 0px",
                      backgroundColor: "#dcdcdc",
                      color: "green",
                      padding: "5px",
                      fontSize: "11px"
                    }}
                  >
                    {" "}
                    SOON!
                  </Box>
                )}
                {!item.isopen && (
                  <Box
                    sx={{
                      position: "absolute",
                      color: "#fb7b7b",
                      left: "0%",
                      top: "61%",
                      borderRadius: "0px 10px 10px 0px",
                      backgroundColor: "black",
                      color: "white",
                      padding: "5px",
                      fontSize: "11px"
                    }}
                  >
                    {" "}
                    PRIVATE
                  </Box>
                )}
                {user ? (
                  item.organizer === user.displayName ? (
                    <Box
                      sx={{
                        position: "absolute",
                        color: "#fb7b7b",
                        left: "50%",
                        transform: "translateX(-50%)",
                        top: "3%",
                        borderRadius: "10px",
                        color: "green",
                        backgroundColor: "#a0d8b3b4",
                        padding: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      You organized
                    </Box>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                {user ? (
                  item.slots.includes(user.displayName) &&
                  !(item.organizer === user.displayName) ? (
                    <Box
                      sx={{
                        position: "absolute",
                        color: "#fb7b7b",
                        left: "50%",
                        transform: "translateX(-50%)",
                        top: "3%",
                        borderRadius: "10px",
                        color: "orange",
                        backgroundColor: "#f7db6ab7",
                        padding: "5px",
                        fontWeight: "bold",
                      }}
                    >
                      {" "}
                      You participate
                    </Box>
                  ) : (
                    ""
                  )
                ) : (
                  ""
                )}
                <Box  sx={{
                      position: "absolute",
                      color: "white",
                      left: "2%",
                      top: "31%",
                      backgroundColor: "#a2a1a196",
                      borderRadius: "10px",
                      padding: "5px",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"space-around",
                      gap:1
                    }}>
                {foundItem && (
                  <Box
                    sx={{
                     
                      color: "white",
                   
                      backgroundColor: "#a2a1a196",
                      borderRadius: "10px",
                      padding: "5px",
                      display:"flex",
                      alignItems:"center"
                    }}
                  >
                    {foundItem.icon}
                  </Box>
                )}
               
                 
                  {item?.lengthOfActivity? item.lengthOfActivity? <Box
                    sx={{
                      
                      color: "white",
                   
                      height:"24px",
                      backgroundColor: "#a2a1a196",
                      borderRadius: "10px",
                      padding: "5px",
                      display:"flex",
                      alignItems:"center"
                    }}
                  >
                    <AccessTimeIcon sx={{height:"20px"}}/> {` ${item.lengthOfActivity}h`}
                  </Box>:"":""}
                  <Box
                  className="gradient-heading2"
                    sx={{
                      
                      color: "white",
                   
                      height:"24px",
                      backgroundColor: "#a2a1a196",
                      borderRadius: "10px",
                      padding: "5px",
                      display:"flex",
                      alignItems:"center"
                    }}
                  >
                    {item?.price? item.price? `${item.price}Ft`:"FREE":"FREE"}
                  
                  </Box>
                  </Box>
                <CardMedia
                  component="img"
                  sx={{ height: 140, backgroundColor:"#e1dfdf" }}
                  src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${
                    item._id
                  }&number=${0}&event=${true}`}
                 
                  
                />
                <CardContent className="tooltip  " sx={{maxWidth:"57%"}}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "250px",
                    }}
                  >
                    {item.trackName}{" "}
                    <span class="tooltiptext">{item.trackName} </span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.city ? item.city : "-"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.time}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.isLimited
                      ? `${item.slots.length}P (remaining ${count}P)`
                      : "unlimited"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.sportType ? item.sportType : "-"}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        );
      }
      //}
    }
  });

  const liveActivities2 = props.allTrack.map(function (item, index) {
    console.log(item)
    const foundItem = sportsIcons.find(
      (item1) => item1.name === item.activity
    );
      

        if (item.latAndLong) {
          try {
            // Check if latAndLong already exists in allLocation2
            const existingLocation = allLocation2.find(location => location[0][0] === item.latAndLong[0] && location[0][1] === item.latAndLong[1]);
        
            if (existingLocation) {
              // Add item._id and item.trackName to the existing location
              existingLocation[1].push(item._id);
              existingLocation[2].push(item.trackName);
            } else {
              // Create a new entry for latAndLong
              allLocation2.push([item.latAndLong, [item._id], [item.trackName]]);
            }
          } catch (error) {
            console.log(error);
          }
        }

        return (
          <Grid
            item
            padding={"8px !important"}
         
            xl={12}
            key={item._id}
            sx={{ cursor: "pointer" }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              
            >
              <Box display={"flex"} justifyContent={"center"} sx={{width:"100%"}} position={"relative"}>
                <Box sx={{backgroundColor:"#D8D9DA", width:{xs:"90%",md:"70%"}, borderRadius:"10px", position:"relative"}}  display={"flex"} flexDirection={{xs:"column", md:"row"}} justifyContent={"center"} alignItems={"center"}>
                {foundItem && (
                  <Box
                    sx={{
                     position: "absolute",
                     left:{md:"1%",xs:"7%"},
                     top:{md:"8%",xs:"77%"},
                      color: "white",
                   
                      backgroundColor: "#a2a1a196",
                      borderRadius: "10px",
                      padding: "5px",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      
                    }}
                  >
                    {foundItem.icon}
                  </Box>
                )}

<Typography
                    sx={{
                     position: "absolute",
                     left:{md:"1%",xs:"18%"},
                     top:{md:"20%",xs:"77%"},
                      
                   
                      
                      
                      
                      
                    }}
                  >
                    reviews: 4.7/5
                  </Typography>
              <Card
                className="tracks"
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  width:"500px",
                  position: "relative",
                 
                }}
                onClick={
                  
                     () => navigate(`/tracks/${item.name}/2`)}
                    
              >

               
            
         
                <CardMedia
                  component="img"
                  sx={{ height: 140, backgroundColor:"#e1dfdf" }}
                  src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${
                    item._id
                  }&number=${0}&event=${true}`}
                 
                  
                />
                <CardContent className="tooltip  ">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      maxWidth: "250px",
                    }}
                  >
                    {item.name}{" "}
                    <span class="tooltiptext">{item.name} </span>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.city ? item.city : "-"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.time}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                  {item.slot_number.join('P, ')}P
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.activity}
                  </Typography>
                </CardContent>
              </Card>
              <Box sx={{padding:"30px"}}>
              <Typography sx={{width:"345px"}} variant="h6">{item.description}</Typography>
              </Box>
              </Box>
              </Box>
            </motion.div>
          </Grid>
        );
      
      //}
    
  });

  const loadMore = async (filter = false) => {
    const count = props.allLinks.length;
    const count2 = props.allTrack.length;
    console.log(count, count2, community, filterItems)
    try {
      //setTimeout( async()=>{
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/partialLoad`,
        {
          method: "POST",
          body: JSON.stringify({ count, count2, community, filterItems }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("ll")
      const data = await response.json();
      if (community) {
        if (data.allLinks.length) {
          if (filter) {
            props.allLinksSetter([...data.allLinks]);
          } else {
            props.allLinksSetter((prev) => [...prev, ...data.allLinks]);
          }
        } else {
          setIsMoreLink(false);
        }
      } else if (!community) {
        if (data.allTrack.length) {
          props.allTracksSetter((prev) => [...prev, ...data.allTrack]);
        } else {
          setIsMoreTrack(false);
        }
      }
      //  },2000)
    } catch (error) {
      console.error(error);
      console.log("eroor")
    }
  };
  console.log(props.allLinks.length, props.allTrack.length);
  useEffect(() => {
    
   
    if(isFirstRender.current) {
    
      isFirstRender.current=false
    }
     else{
      
    if(!community){
  console.log("zz")
      loadMore();
    } else if(community){
      console.log("zzdd")
     
      loadMore();
    }
  }}, [community,newFilterSet]);
  
  useEffect(() => {
    if(isFirstRender.current) {
    
      isFirstRender.current=false
    }
     else{
  console.log("mmmxx")
    props.allTracksSetter(prev=>prev=[])
    props.allLinksSetter(prev=>prev=[])
    setIsMoreLink(true)
    setIsMoreTrack(true)
    setNewFilterSet(prev=>!prev)
    
    
    
  
  
  
    
  }}, [ filterItems]);

  

  console.log(filterItems);
  console.log(props.allTrack);
  return (
    <Grid
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Header
        title="Fantastic business"
        success={props.getDownData}
        name={props.getDownData2}
        setShowRegister={setShowRegister}
        setShowLogin={setShowLogin}
        setHelp={setHelp}
      />
      <Grid width={"95%"}>
        <Sports setCurrentSport={setCurrentSport} sport={currentSport} />
        
        <Grid display={"flex"} alignItems={"center"}>
          {/* <Button margin={"15px !important"} sx={{height:"80%", margin:"10px"}} variant="contained" onClick={showFavourite}>{favouriteData.length ===0 ?"show favourites only":"show all"}</Button>
      <Button margin={"15px !important"} sx={{height:"80%", margin:"10px"}} variant="contained" onClick={mapViewFunc}>{!mapView?"Show map view":"Show detailed view"}</Button>
      <Button /*onClick={()=>navigate("/communityEvent")} onClick={()=>setShowEventForm(true)} margin={"15px !important"} sx={{height:"80%", margin:"10px", backgroundColor:'green',color:"#0BF763"}} variant="contained">
        <TelegramIcon sx={{color:"#0BF763"}}/> Let's organize an event</Button>  */}
        </Grid>
        <Box display={"flex"} justifyContent={"center"}>
      
          <Filter
            
            
            mapViewFunc={mapViewFunc}
            setShowEventForm={setShowEventForm}
            setShowRegister={setShowRegister}
            
            mapView={mapView}
            communityLength={activityCounter}
            partnersLength={filteredData.length}
            community={community}
            
          />
        </Box>

        {!mapView ? (
          <Grid marginTop={"0px"}>
            <InfiniteScroll
              className="element"
              scrollableTarget="container"
              scrollThreshold={0.9}
              loader={<Loading />}
              next={loadMore}
              dataLength={community?props.allLinks.length:props.allTrack.length}
              hasMore={community?isMoreLink:isMoreTrack}
            >
              {" "}
              <Grid
                sx={{
                  marginLeft: "0px",
                  marginRight: "0px",
                  marginTop: "0px",
                  width: "100%",
                  marginBottom: "30px",
                }}
                container
                spacing={2}
                className="container"
              >
                {community?liveActivities:liveActivities2}
              </Grid>{" "}
            </InfiniteScroll>
          </Grid>
        ) : (
          <MapContainer
            setShowRegister={setShowRegister}
            locations={allLocation2}
            tracks={validLinks}
            center={filterItems ? filterItems[2] : "Budapest"}
          />
        )}

        {/*  <Typography variant="h5" sx={{margin:"-10px 8px 20px"}}>Community events</Typography>
      <Grid
        sx={{ margin:"0px",marginTop:"-16px" ,width: "100%" }}
        container
        justify="center !important" alignItems="center !important"
        spacing={2}
        className="container"
      >

      {liveActivities}
      </Grid>
      
            <SimpleMap locations={ [
    { lat: 47.497912, lng: 19.040235 }, // Budapest Parliament
    
    { lat: 47.5142, lng: 19.0373 }, // St. Stephen's Basilica
    { lat: 47.4984, lng: 19.0408 }, // Chain Bridge
    { lat: 47.4849, lng: 19.0402 }, // Gellért Hill
  ]
  }/> 
        */}

        {showLogin && <LoginWithFirebase indicator={setShowLogin} />}
        {showRegister && (
          <UserRegisterWithFirebase
            indicator={setShowRegister}
            indicatorforLogin={setShowLogin}
          />
        )}
        {showEventForm && <CommunityEvent indicator={setShowEventForm} />}
        {help && <Help indicator={setHelp} />}
      </Grid>
    </Grid>
  );
}
