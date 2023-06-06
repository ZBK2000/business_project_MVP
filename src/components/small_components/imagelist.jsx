import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export default function MasonryImageList(props) {
  return (
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
        
    <Box sx={{ width: "80%", height: "90%", overflowY: 'scroll', backgroundColor:"white" }}>
      <ImageList variant="masonry" cols={3} gap={8}>
        {Array.from({ length: props.imgs.length}, (_, i) => (
          <ImageListItem key={i}>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${props._id}&number=${i}&event=${true}`}
              srcSet={`${import.meta.env.VITE_BACKEND_URL}/img?user_id=${props._id}&number=${i}&event=${true}`}
              alt={"img"}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    
    </Box>
    </Box>
  );
}

