import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./FooterNOTUSED";
import Header from "./Header";
import { UserAuth } from "../context/AuthContext";
import { motion } from "framer-motion"
import ResetPassword from "./forgotPassword";
import { toast } from "react-toastify";
import Loading from "./loading";
import ProvideUserName from "./ProvideUserName";
import ClearIcon from '@mui/icons-material/Clear';
import { useEffect } from "react";

export default function LoginWithFirebase(props) {
  //declaring states and consts
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameOfUser, setNameOfUser] = useState("");
  const [registrateds, setRegistrateds] = useState("");
  const [loginerror, setLoginError] = useState(0)
  const [reset, setReset] = useState(false)
  const { user } = UserAuth();
  const navigate = useNavigate();
  const { name } = useParams();
  const { signIn } = UserAuth();
  const {googleSignIn} = UserAuth()
  const { update } = UserAuth();
  const [provideUserName, setProvideUserName] = useState(false)


  //this is for simply to renavige if someone wants to enter this enpoint regardless they are logged in
 

  //this is the submit form for logging in
  const SignInUser = async (event) => {
    event.preventDefault();

    //here we first make the sign in with firebase and if that successful, we retrieve data from mongodb
    try {
      await signIn(email, password);
    
    
    const data = { password: email };
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const accepted = await response.json();

    //setRegistrateds(accepted);
    //props.getUpData(accepted);
console.log(accepted?.user)
    if (accepted) {
      //props.getUpData2(accepted.user);
      
      props.indicator(false)
      toast(`Welcome ${accepted.user}` )
      //  navigate(`/`);
      
    }
  } catch (error) {
    console.log(error)
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password'){
        setLoginError(1)
    } else {
      setLoginError(2)
    }
  }
  };
  const handleGoogleSignIn = async ()=>{
    try {
      const user1 =  await googleSignIn()
      console.log(user1)
      const data = { password: user1.email };
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/GoogleSignIn`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const accepted = await response.json();
      console.log(accepted)
      if(JSON.stringify(accepted.msg)==JSON.stringify("successful login")){
        await update(user1, accepted.userName)
        toast(`Welcome ${accepted.userName}` )
        props.indicator(false)
        
      
       // navigate(`/`)
      } else if(accepted.msg=="successfully registrated"){
        
          setProvideUserName(true)
          
      }
    } catch (error) {
      console.log(error)
    }
  }

  function closePopup(e){
    if (e.target === e.currentTarget) {
      // Clicked on the parent element, not on any of its descendants
      props.indicator(false)
    } 
  }
  useEffect(() => {
    // Disable scrolling when the component is mounted
    document.body.style.overflow = 'hidden';

    // Enable scrolling when the component is unmounted
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Box  onClick={(e)=>closePopup(e)} sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      bgcolor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity
      display: 'flex',
      alignItems: {md:'center',xs:"flex-end"},
      justifyContent: 'center',
      zIndex: 9999, // Higher z-index to make sure it's above everything else
    }}>
         <motion.div
    initial={{ opacity: 0, y: 500}}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}>
      <Box sx={{width:"400px",height:"450px", backgroundColor:"white", borderRadius:"10px", padding:"10px", position:"relative"}}>
      <Button sx={{right:"0%", position:"absolute"}} onClick={()=>props.indicator(false)}><ClearIcon sx={{color:"black"}} /></Button>
    <div className="logindiv">

      {!user ? (
        <div>
        {/*   {name != "home" && name != "favourite" ? (
            <Typography margin={"15px"}>
              Please log in to see the page of that track!
            </Typography>
          ) : (
            ""
          )}
          {name == "favourite" ? (
            <Typography margin={"15px"}>
              You have to log in to save favourite tracks
            </Typography>
          ) : (
            ""
          )}*/}
          <form onSubmit={SignInUser}>
          <Box display={"flex"} flexDirection={'column'} justifyContent={"center"} alignItems={"center"}>

<Typography variant="h5">Log in to your account</Typography>
<Typography sx={{textAlign:"center",marginBottom:"25px", marginTop:"10px"}} variant="h7">Welcome back, please enter your details</Typography>
<Button onClick={handleGoogleSignIn} variant="outlined" sx={{color:"black", borderColor:"#d6d6d6", width:'100%', margin:"10px"}}>Continue with Google</Button>


<Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
<hr style={{  backgroundColor: "#d6d6d6",width:"100px",boxShadow:"none"  }}/>
  <Typography margin={"10px"} sx={{color:"#d6d6d6"}}>OR</Typography>
  <hr style={{  backgroundColor: "#d6d6d6",width:"100px",boxShadow:"none" }} />
</Box>
</Box>
            <div>
              <label htmlFor="names">
                <Typography>Email:</Typography>{" "}
              </label>
              <input
                type="email"
                id="names"
                onChange={(e) => setEmail(e.target.value)}
                style={{borderColor: loginerror==1?"red":""}}
              />
              {/*           <label htmlFor="name"><Typography>Name:</Typography> </label>
            <input
              type="text"
              id="name"
              onChange={(e) => setNameOfUser(e.target.value)}
            /> */}
              <label htmlFor="prices">
                <Typography>Password:</Typography>{" "}
              </label>
              <input
                type="password"
                id="prices"
                onChange={(e) => setPassword(e.target.value)}
                style={{borderColor: loginerror==1?"red":""}}
              />
               <Button type="submit" variant="outlined" sx={{width:"100%", color:"black", marginTop:"20px",backgroundColor:"#d6d6d6"}}>
              <Typography>Log in</Typography>{" "}
            
               </Button>
               <Typography sx={{width:"100%", textAlign:"center", marginTop:"10px", cursor:"pointer"}} onClick={()=>setReset(prev=>!prev)}> <u>Forgot password</u></Typography>
            </div>
          </form>
        </div>
      ) : (
        
        <Loading/>
      )}
      {loginerror == 1 ? (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          wrong email/password 
        </Typography>
      ) : (
        ""
      )}
    {loginerror == 2 ? (
        <Typography sx={{ marginTop: "15px" }} variant="h5" className="success">
          Error please try again
        </Typography>
      ) : (
        ""
      )}
     
    </div>
    </Box>
    </motion.div>
    {reset&&<ResetPassword indicator={setReset}/>}
    {provideUserName && <ProvideUserName indicator={setProvideUserName} indicator2={props.indicator}/>}
    </Box>
  );
}
