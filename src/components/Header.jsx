import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { UserAuth } from "../context/AuthContext";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Fab from '@mui/material/Fab';
;
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useEffect } from "react";


export default function Header (props){
 
    const {user, logout} = UserAuth()
    const id = user ? user.displayName : "";
const [userInfo, setUserInfo] = useState("")
    async function logoutFromUser(){
      await logout()
    }

    const navigate = useNavigate()

    //declare the function so based on the innerhtml of the button should it navigate to the right place
    //this not work like this on iphone so i create a differernt onclick function for each of them
    /* function navigateFunction(e, nameOfUser){
        console.log(e.target)
        if (e.target.innerText == "LOGIN"){
            navigate("/login/home")
        }
        else if (e.target.innerText == "SIGN UP"){
            navigate("/signup")
        }
        else if (e.target.innerText == "REGISTER TRACK"){
            navigate("/register")
        }
        else if (e.target.innerText == "Business"){
            navigate("/")
        }
        else {
            navigate("/user")
        }
        
    } */

    function navigateToLogin(){
      setAnchorEl(null);
      props.setShowLogin(true)
    }

    function navigateToSignUp(){
      setAnchorEl(null);
      props.setShowRegister(true)
    }

    function navigateToMain(){
      navigate("/")
    }

    function navigateToRegister(){
      navigate("/register")
    }

    function navigateToUser(){
      navigate("/user")
    }

    function navigateToHelp(){
      navigate("/help")
    }
    function navigateToSignUpBusiness(){
      navigate("/businessRegister")
    }

    //declaring things for the menu on mobile size
    const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
  fetching_user()}, [user])
console.log(userInfo)
    return (
      <Box sx={{ flexGrow: 1, width:"100%",}}>
        <AppBar position="static" >
          <Box display={"flex"} justifyContent={"center"} margin={"0% 2.5%"}>
          <Box sx={{ width: props?.startOfHeader ?"1152px":"100%", padding:props?.startOfHeader ?"0px":"0px"}} >
          <Toolbar sx={{padding:"0px !important"}}>
          <Typography  onClick={navigateToMain} variant="h7" component="div" sx={{ flexGrow: 1, cursor: "pointer"}}>
          SPORT - <span style={{color:"red"}}>TOGETHER</span>
            </Typography>
            {/*<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {props.title == "Fantastic business"?"": props.title} 
            </Typography>*/}
        {/*     <Fab >Show map</Fab>
            <Fab>Show Favourites</Fab> */}
            <Box>
            <Button sx={{ display: { xs: 'inline', marginTop:"5px" }}}  onClick={()=>props.setHelp(true)} color="inherit"> <HelpOutlineIcon /></Button>
            

{/*user?"":<Button sx={{ display: { xs: 'none', md: 'inline' }}} onClick={navigateToSignUpBusiness} color="inherit">SIGN UP AS A BUSINESS</Button>*/ }




<Button 

 color="inherit"
 id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}> <AccountCircle /></Button>
<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
       {user ?"":<MenuItem  onClick={navigateToLogin} color="inherit">LOGIN</MenuItem>}
{user?"":<MenuItem  onClick={navigateToSignUp} color="inherit">SIGN UP</MenuItem> }

{user ?<MenuItem disabled sx={{opacity:"1 !important"}} onClick={navigateToUser} color="inherit">
<Box sx={{ display: "grid", gridTemplateColumns: "60px auto", gap: 6 }}>
 <Typography>UserName:</Typography> <Typography>{user.displayName}</Typography> </Box> </MenuItem>: "" }
 {user ?<MenuItem disabled sx={{opacity:"1 !important"}} onClick={navigateToUser} color="inherit">
<Box sx={{ display: "grid", gridTemplateColumns: "60px auto", gap: 6 }}>
 <Typography>Email: </Typography> <Typography>{userInfo?userInfo.password:"cannot get"}</Typography> </Box> </MenuItem>: "" }

{user&&<MenuItem disabled   onClick={navigateToUser} color="inherit"> <Typography sx={{textAlign:"center", width:"100%"}}>---</Typography> </MenuItem>}
{user? <MenuItem onClick={logoutFromUser} color="inherit">

    LOG OUT</MenuItem>: "" }
    {user? <MenuItem onClick={logoutFromUser} sx={{color:"red"}}>

    DELETE ACCOUNT</MenuItem>: "" }

      </Menu>
            </Box>
          </Toolbar>
          </Box>
          </Box>
        </AppBar>
      </Box>
    );
  }