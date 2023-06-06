import { Box } from "@mui/system";
import { Button, Fab, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Select, TextField, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { toast } from 'react-toastify';

export default function  DeleteAccountConfirm(props) {
    const {deleteUserFunc} = UserAuth()
    const {reauthenticateUser} = UserAuth()
    const { user } = UserAuth();
    const [leaveCancel, setLeaveCancel] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

console.log(user)
  async function deleteAccount(user, email, password) {
   const result = await reauthenticateUser(email, password,user.providerData[0].providerId)
   console.log(result)
    if(result){
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/deleteAccount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: user.displayName
        
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if(data.msg === "Account deleted successfully"){
          const deleted =  await deleteUserFunc(user)
          if (deleted){
            toast(`Account Deleted`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                } )
                props.indicator(false)
          }
      } else if(data.msg === "you organize/participate"){
setLeaveCancel(true)
      }
    } else {
      throw new Error('Request failed with status: ' + response.status);
    }
  } catch (error) {
    console.error(error);
  } }
}
function closePopup(e){
  if (e.target === e.currentTarget) {
    // Clicked on the parent element, not on any of its descendants
    props.indicator(false)
  } 
}
return (
<Box  onClick={(e)=>closePopup(e)} sx={{
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
    zIndex: 1200, // Higher z-index to make sure it's above everything else
    
    
  }}>
    <Box sx={{width:"300px", backgroundColor:"white", borderRadius:"10px", padding:"30px", position:"relative"}}
    >
  {!leaveCancel?<Box><Typography sx={{textAlign:"center" }} variant="h5">Are you sure you want to delete your profile? This cannot be undone</Typography>

 {user? user.providerData[0].providerId==="password"?<Box><Typography>You have to re-enter your email and password</Typography> <label >
                <Typography>Email:</Typography>{" "}
              </label>
              <input
                
                
                onChange={(e) => setEmail(e.target.value)}
               style={{zIndex:"1600 !important"}}

              />
         
              <label >
                <Typography>Password:</Typography>{" "}
              </label>
              <input
                value={(password)}
                
                onChange={(e) => setPassword(e.target.value)}
                
              /></Box>:<Typography>You will have to re-authenticate with pop up to delete your account</Typography>:""}
  <Button onClick={()=>deleteAccount(user, email, password)} sx={{backgroundColor:"red", margin:"10px"}}>Delete account</Button>
  <Button onClick={()=>props.indicator(false)} sx={{backgroundColor:"grey", color:"black", width:"136px"}}>Rather Not</Button>
  </Box>:<Box><Typography variant="h6">You cannot delete your profile while participating or organizing activites!</Typography>
  <Typography>Please leave all joined events and cancel any organized events than try again</Typography>
  </Box>}</Box>
</Box>
)

}
