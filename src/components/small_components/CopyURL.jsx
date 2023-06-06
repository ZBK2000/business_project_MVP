import { Button, Fab } from '@mui/material';
import React from 'react';

const CopyToClipboardButton = (props) => {
    const handleClick = () => {
        const url = window.location.href;
        const customLink = `Invitation to join this Event at ${props.datetime}`;
        const text = `${customLink} ${url}`;
      
        // Create a temporary textarea element
        const textarea = document.createElement('textarea');
      
        // Set its value to the hyperlink with the custom text
        textarea.value = text;
      
        // Add it to the DOM
        document.body.appendChild(textarea);
      
        // Select its contents
        textarea.select();
      
        // Copy its contents to the clipboard
        document.execCommand('copy');
      
        // Remove the temporary textarea element
        document.body.removeChild(textarea);
      };
  return (
    <Fab variant='extended'
   sx={{color:"black", borderColor:"black", width:props?.w? `${props.w}%`:"150px"}}
      onClick={handleClick}
      onCopy={handleClick}
      data-clipboard-text={window.location.href}
    >
      Copy URL
    </Fab>
  );
};

export default CopyToClipboardButton;