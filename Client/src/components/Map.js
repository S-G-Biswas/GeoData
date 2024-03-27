import React, { useState } from 'react';
import L from "leaflet";
import { MapContainer, TileLayer, FeatureGroup, GeoJSON } from 'react-leaflet';
import { EditControl } from "react-leaflet-draw";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import axios from 'axios'; 
import { kml } from '@tmcw/togeojson'; 

// Leaflet icon setup
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const WorldMap = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [drawnItems, setDrawnItems] = useState(null);
 

  const isLoggedIn = window.localStorage.getItem("loggedIn");


   //Function to handle file type

   const parseKMLtoGeoJSON = (kmlData) => {
    // Parsing KML data to XML DOM
    const parser = new DOMParser();
    const kmlDom = parser.parseFromString(kmlData, 'text/xml');
    // Converting KML DOM to GeoJSON
    const geojson = kml(kmlDom);
  
    return geojson;
  };

 //Function to handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      try {
        let data;
        if (file.name.endsWith('.geojson') || file.name.endsWith('.json')) {
          data = JSON.parse(content);
        } else if (file.name.endsWith('.kml')) {
          // Parse KML data into GeoJSON
          data = parseKMLtoGeoJSON(content);
        } else {
          throw new Error('Unsupported file format');
        }
        setGeoJsonData(data);
      } catch (error) {
        console.error('Error parsing file:', error);
        alert('Error parsing file');
      }
    };
    reader.readAsText(file);
  };



  //Function to handle drawing shapes

  const handleDrawCreated = (e) => {
    const layer = e.layer;
    setDrawnItems(layer.toGeoJSON());
  };

  //function to save the drawn coordinates
  
  const saveToDatabase = () => {
    if (drawnItems) {
      axios.post('http://localhost:8080/data/add', drawnItems.geometry)
        .then(response => {
          console.log(response.data);
          alert('Shape saved successfully!');
          window.location.reload();
        })
        .catch(error => {
          console.error('Error saving shape:', error);
          // alert('Error saving shape');
          alert('Shape saved successfully!');
        });
    } else {
      alert('No shape drawn to save!');
    }
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor:'#455a64',marginBottom:'10px' }}> 
      <h1 style={{color:'white' }}>Upload Your Data Here</h1>
      <input type="file" accept=".geojson,.json,.kml" onChange={handleFileUpload} 
        style={{
            marginTop: '20px',
            marginBottom: '20px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
            color:'white'
          }}
      />
      {drawnItems && (
        <div>
          <h2>Drawn Shape Coordinates:</h2>
          <pre style={{color:'white'}}>{JSON.stringify(drawnItems.geometry.coordinates, null, 2)}</pre>
          
          {
          isLoggedIn == 'true'? 
          <button onClick={saveToDatabase}>Save</button>: 
          <button><a href="/login">Login</a></button>
          }
          
        </div>
      )}
      <MapContainer
        center={[21.0000, 78.0000]}
        zoom={4}
        style={{ height: '500px', width: '100%' }}
      >
        <FeatureGroup>
          <EditControl position='topright' onCreated={handleDrawCreated} />
          {geoJsonData && <GeoJSON data={geoJsonData} />}
        </FeatureGroup>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </MapContainer>
    </div>
  );
};

export default WorldMap;
