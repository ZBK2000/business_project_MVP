import { Box } from "@mui/system";
import { Fab, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Select, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';

export default function  Players(props) {
console.log(props.h3s,props.id, "haha")
let players = []
let rigthTimeLine
for(let h3 in props.h3s){
    if(props.h3s[h3].id ===props.id){
        console.log("hello")
        players = props.h3s[h3].slots
        rigthTimeLine = props.h3s[h3].text
    }
}
console.log(players)
return (
<Box  onClick={()=>props.indicator(false)} sx={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    bgcolor: 'rgba(0, 0, 0, 0.5)', // Background color with opacity
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    overflow:"auto"
     // Higher z-index to make sure it's above everything else
    
    
  }}>
    <Box sx={{width:"300px", backgroundColor:"white", borderRadius:"10px", padding:"10px"}}
    >
  <Typography marginBottom={"10px"} variant="h4">Interested Players</Typography>

  <Box display="flex" marginBottom={"10px"} >
          <Typography variant="h6" sx={{ width: 250 }}> Track Name:</Typography>
          <Typography variant="h6" sx={{ width: 250 }}> {props.subTrack} </Typography>
        </Box>
        <Box  marginBottom={"10px"} display="flex" >
          <Typography variant="h6" sx={{ width: 250 }}> Date:</Typography>
          <Typography variant="h6" sx={{ width: 250 }}>  {props.day}</Typography>
        </Box>
        <Box marginBottom={"10px"} display="flex" >
          <Typography variant="h6" sx={{ width: 250 }}> Time:</Typography>
          <Typography variant="h6" sx={{ width: 250 }}> From {rigthTimeLine.split("-")[0]}:00 to  {rigthTimeLine.split("-")[1].split(" ")[0]}:00 </Typography>
        </Box>
       
  <List sx={{border:"1px solid black", borderRadius:"10px"}}>
  {players.map((slot) => (
    <ListItem sx={{ margin: "0px" }} className="slots-list-element">
      <PersonIcon />
      <ListItemText sx={{ margin: "0px 10px" }}>{slot}</ListItemText>
    </ListItem>
  ))}
</List>
  </Box>
</Box>
)

}
