import React from 'react';

const CircleLine = ({ number }) => {
  return (
    <div style={{display:"flex", justifyContent:"center", margin:"10px  0px 30px 0px"}}>
      {Array.from({ length: 10}).map((_, index) => (
        <div
          key={index}
          style={{
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: index === number - 1 ? 'black' : 'gray',
            margin: '5px',
          }}
        />
      ))}
    </div>
  );
};

export default CircleLine;