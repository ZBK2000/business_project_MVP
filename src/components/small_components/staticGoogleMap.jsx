import React, { useMemo, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

function GoogleMapIndividual(props) {
    const [map, setMap] = useState(null);
    const center = useMemo(()=>({ lat: props.coordinates[0], lng: props.coordinates[1] }), [])
  console.log(props)
  const mapOptions = {
    styles: [
      {
        featureType: 'poi',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }],
      },
    ],
  };

  const onLoad = map => {
    setMap(map);
  };

  return (
    <LoadScript
      googleMapsApiKey= {import.meta.env.VITE_GOOGLE_MAPS_API}
    >
      <GoogleMap
        mapContainerStyle={{ height: "100%",minHeight:"300px", width: "100%",borderRadius:'10px' }}
        zoom={12}
       center={center}
        onLoad={onload}
      >
    
      <Marker
      
        
       
        
        position={{ lat: props.coordinates[0], lng: props.coordinates[1] }}
      />
   
      
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapIndividual;