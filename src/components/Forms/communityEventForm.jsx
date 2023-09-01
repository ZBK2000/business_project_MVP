import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import { Box, Button,TextField, Typography } from "@mui/material";
import { UserAuth } from "../../context/AuthContext";
import SportsSelect from "../small_components/sportSelect";
import StaticDatePickerCollapsible from "../small_components/NextSevenDay copy";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";
import TimeLinePicker from "../small_components/timeline";
import CircleLine from "../small_components/FormprogressIndicatior";

export default function CommunityEvent(props) {
  //declaring states and consts
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [sportType, setSportType] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [slots, setSlots] = useState(0);
  const [img, setImg] = useState("");
  const [trackName, setTrackName] = useState([]);
  const [trackCounter, setTrackCounter] = useState([""]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLimited, setIsLimited] = useState(true);
  const [timeLine, setTimeLine] = useState("");
  const [exactDate, setExactDate] = useState("");
  const [missing, setMissing] = useState(false);
  const [online, setOnline] = useState(false);
  const [price, setPrice] = useState(0);
  const [lengthOA, setLengthOA] = useState(false);
  const [onlineLink, setOnlineLink] = useState("");
  const { user } = UserAuth();

  const label = { inputProps: { "aria-label": "Switch demo" } };
  const userName = user ? user.displayName : "";
  console.log(slots, trackName, isOpen, sportType, exactDate, timeLine);

  async function generateRandomLinkPath(
    trackName,
    slots,
    loc,
    time,
    user,
    subTrackName,
    description,
    isopen,
    city,
    sportType,
    exactDate,
    isLimited,
    organizer,
    img,  lengthOA,price
  ) {
    const activity_start_datetime = new Date(`${exactDate} ${time}`);
    for (const item of [
      trackName,
      online ? "skip" : loc,
      time,
      description,
      online ? "skip" : city,
      sportType,
      exactDate,
    ]) {
      if (!item.length > 0) {
        setMissing(true);
        console.log("hi")
        return;
      }
    }

    if(price==="priced"){
      setMissing(true)
      console.log("hi")
      return
    }
    if(!lengthOA){
      setMissing(true)
      console.log("hi")
      return
    }
    if (isLimited) {
      if (!(slots > 0)) {
        setMissing(true);
        console.log("hi")
        return;
      }
      slots = Array(slots).fill("");
    } else {
      slots = Array(1).fill("");
    }

    let latAndLong;
    let data_loc;
    if (!online) {
      const response_loc = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${loc}&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API
        }`
      );
      data_loc = await response_loc.json();

      if (data_loc.results.length > 0) {
        const location = data_loc.results[0].geometry.location;

        latAndLong = [location.lat, location.lng];
      }
    }
    let formData = new FormData();
    for (let i = 0; i < img.length; i++) {
      formData.append("img_urls", img[i]);
    }
    console.log(slots);
    slots[slots.indexOf("")] = user;
    console.log(subTrackName);
    const dataForLink = {
      trackName,
      slots,
      location: !online
        ? data_loc?.results[0]?.formatted_address
          ? data_loc.results[0].formatted_address
          : loc
        : "Online",
      time: `${exactDate} ${time}`,
      user,
      subTrackName,
      description,
      isopen,
      city: online ? "Online" : city,
      sportType,
      isLimited,
      organizer,
      activity_start_datetime,
      latAndLong,
      onlineLink: online ? onlineLink : "",
      price: price?price:0,
      lengthOfActivity: lengthOA
    };
    console.log(dataForLink);
    const response = await toast.promise(
      fetch(`${import.meta.env.VITE_BACKEND_URL}/customLink`, {
        method: "POST",
        body: JSON.stringify(dataForLink),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        pending: "Please wait",

        error:
          "Sorry, there was some problem creating your event, please try again :(",
      }
    );
    const linkData = await response.json();
    formData.append("event", trackName);
    //we make another request to store the name of the images in the tracks database ( its only after the database for this track was created)
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/img`, {
      method: "POST",
      body: formData,
    });
    const imgupload = await res.json();
    if (linkData.msg === "success" && imgupload.msg === "success") {
      navigate(`/tracks/${trackName}/${linkData.linkId}`);
      toast(`Successfully created the '${trackName}' Event 🥳`);
    }
  }
  console.log(exactDate, description);

  function closePopup(e) {
    if (e.target === e.currentTarget) {
      // Clicked on the parent element, not on any of its descendants
      props.indicator(false);
    }
  }

  useEffect(() => {
    // Disable scrolling when the component is mounted
    document.body.style.overflow = "hidden";

    // Enable scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Box
      onClick={(e) => closePopup(e)}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: "rgba(0, 0, 0, 0.5)", // Background color with opacity
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Higher z-index to make sure it's above everything else
        zIndex: 1060,
      }}
    >
      <motion.div
        initial={{ x: "-100vh" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 1.5, bounce: 0.5 }}
      >
        <Box
          
          sx={{
            width: { md: "600px", sx: "80%" },
            height: "600px",
            backgroundColor: "white",
            borderRadius: "10px",
            padding: "40px",
            overflow: "auto",
          }}
        >
          <Button
            sx={{ right: "0%", top: "1%", position: "absolute" }}
            onClick={() => props.indicator(false)}
          >
            <ClearIcon sx={{ color: "black" }} />
          </Button>

          <Typography
            sx={{ margin: "0px 0px 20px", borderBottom: "1px solid black" }}
            variant="h5"
          >
            Lets organize a cool event and have fun with others
          </Typography>

          <label htmlFor="name">
            <Typography variant="h6" >Name of the Activity:</Typography>
          </label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            style={{ border: missing && !name && "1px solid red" }}
          />
          <CircleLine number={1}/>
           <Typography variant="h6">Start Date:</Typography>
           <Box
            display={"flex" }
            justifyContent={"space-around"}
            alignItems={"center"}
            
            margin={"10px 0px"}
            width={{xs:"100%", md:"none"}}
          >
            <Box>
              <StaticDatePickerCollapsible
                getUpData={setExactDate}
                missing={missing && !exactDate ? true : false}
              />
              {/*<TimePicker getUpData={setTimeLine}/>*/}
            </Box>
            <TimeLinePicker HourMinuteSetter={setTimeLine} missing={missing && !timeLine ? true : false}/>
           
          </Box>
          <CircleLine number={2}/>
          <Typography variant="h6">Activity Type:</Typography>
          <SportsSelect
              missing={missing && !sportType ? true : false}
              sportType={setSportType}
              sport={sportType}
            />
            <Typography sx={{textAlign:"center"}}>Choose 'other' if you didnt found your desired activity type</Typography>
       <CircleLine number={3}/>
            <Typography variant="h6">Pricing:</Typography>
          <Box display={"flex"} gap={2} margin={"10px 0px"} width={"100%"}>
            <Box
              onClick={() => setPrice(false)}
              sx={{
                width:"50%",
                borderRadius: "10px",
                backgroundColor: !price && "#d6d6d6",
                padding: "0px 5px",
                cursor: "pointer",
                
              }}
            >
              <Typography variant="h6" sx={{ textAlign:"center"}}>Free</Typography>
            </Box>
            
            <Box
              onClick={() => setPrice("priced")}
              sx={{
                width:"50%",
                borderRadius: "10px",
                backgroundColor: price && "#d6d6d6",
                padding: "0px 5px",
                cursor: "pointer",
              }}
            >
            
              <Typography variant="h6"  sx={{ textAlign:"center"}}>Priced</Typography>
            </Box>
          </Box>
          {price?      <TextField
              type="Number"
              sx={{ border: missing && price==="priced" && !slots && "1px solid red" }}
              onChange={(e) => setPrice(Number(e.target.value))}
              fullWidth={"100%"}
              label="The price of the Activity (Ft)"
            ></TextField>:""}
<CircleLine number={4}/>
         <Typography variant="h6">Location:</Typography>
          <Box display={"flex"} gap={2} margin={"10px 0px"}>
            <Box
              onClick={() => setOnline(false)}
              sx={{
                borderRadius: "10px",
                backgroundColor: !online && "#d6d6d6",
                padding: "0px 5px",
                cursor: "pointer",
                width:"50%"
              }}
            >
              <Typography variant="h6"  sx={{textAlign:"center"}}>Offline</Typography>
            </Box>
            <Box
              onClick={() => setOnline(true)}
              sx={{
                borderRadius: "10px",
                backgroundColor: online && "#d6d6d6",
                padding: "0px 5px",
                cursor: "pointer",
                width:"50%"
              }}
            >
              <Typography variant="h6" sx={{textAlign:"center"}}>Online</Typography>
            </Box>
          </Box>
          {!online ? (
            <Box>
              <label htmlFor="city">
                <Typography>City:</Typography>
              </label>
              <input
                type="text"
                id="city"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                style={{ border: missing && !city && "1px solid red" }}
              />
              <label htmlFor="location">
                <Typography>Exact Address:</Typography>
              </label>
              <input
                type="text"
                id="location"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
                style={{ border: missing && !location && "1px solid red" }}
              />
            </Box>
          ) : (
            <Box>
              <label htmlFor="online">
                <Typography>
                  Link (Teams room, discord chanel, etc) [optional]:
                </Typography>
              </label>
              <input
                type="url"
                id="online"
                onChange={(e) => setOnlineLink(e.target.value)}
                value={onlineLink}
              />
            </Box>
          )}

<CircleLine number={5}/>
           <label htmlFor="lenght">
            <Typography variant="h6">Length  of Activity (hours):</Typography>
          </label>
          <input
            type="number"
            id="lenght"
            onChange={(e) => setLengthOA(e.target.value)}
            style={{ border: missing && !lengthOA && "1px solid red" }}
          />
<CircleLine number={6}/>
          <label htmlFor="img">
            <Typography variant="h6">Images (optional):</Typography>
          </label>
          <input
            type="file"
            id="img"
            multiple
            onChange={(e) => setImg(e.target.files)}
          />
<CircleLine number={7}/>
          <label htmlFor="desc">
            <Typography variant="h6">Description:</Typography>
          </label>
          <textarea
            id="desc"
            onChange={(e) => setDescription(e.target.value)}
            style={{ border: missing && !description && "1px solid red" }}
          />

<CircleLine number={8}/>
<Typography variant="h6" >Participants settings:</Typography>
          <Box display={"flex"} gap={2} margin={"10px 0px"} width={"100%"}>
            <Box
              onClick={() => setIsLimited((prev) => !prev)}
              sx={{
                borderRadius: "10px",
                backgroundColor: isLimited && "#d6d6d6",
                padding: "0px 5px",
                cursor: "pointer",
                width:"50%"
              }}
            >
              <Typography variant="h6" sx={{ textAlign:"center"}}>Limited Participants</Typography>
            </Box>
            <Box
              onClick={() => setIsLimited((prev) => !prev)}
              sx={{
                borderRadius: "10px",
                backgroundColor: !isLimited && "#d6d6d6",
                padding: "0px 5px",
                cursor: "pointer",
                width:"50%"
              }}
            >
            
              <Typography variant="h6" sx={{ textAlign:"center"}}>Unlimited participants</Typography>
            </Box>
          </Box>
          {isLimited&&<TextField
              
              type="Number"
              sx={{ border: missing && isLimited && !slots && "1px solid red" }}
              onChange={(e) => setSlots(Number(e.target.value))}
              fullWidth={"100%"}
              label="The maximum number of participants:"
            ></TextField>}
<CircleLine number={9}/>
            <Typography variant="h6" >Event Type (you can open it later):</Typography>
          <Box
            display={"flex"}
            justifyContent={"center "}
            alignItems={"center"}
            margin={"10px 0px"}
            gap={2}
          >
            <Typography  sx={{ color: "black", width:"35%", textAlign:"end" }}>
              Closed, Private event 
            </Typography>
            <Switch
              {...label}
              onChange={() => setIsOpen((prev) => !prev)}
              sx={{ backgroundColor: "grey", borderRadius: "10px" }}
            />
             <Typography  sx={{ color: "black",width:"35%" }}>
              Open to anyone interested
            </Typography>
          </Box>
          <CircleLine number={10}/>
          <Button
            variant="outlined"
            sx={{
              color: "black",
              backgroundColor: "#d6d6d6",
              width: "100%",
              marginTop: "10px",
            }}
            onClick={() =>
              generateRandomLinkPath(
                name,
                slots,
                location,
                timeLine,
                user.displayName,
                "-",
                description,
                isOpen,
                city,
                sportType,
                exactDate,
                isLimited,
                userName,
                img,
                lengthOA,
                price
              )
            }
          >
            <Typography>Submit</Typography>
          </Button>
        </Box>
      </motion.div>
    </Box>
  );
}
