import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { GeoData } from '../types';

// Fix for default Leaflet marker icons in React
const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface MapProps {
  geoData: GeoData | null;
}

// Component to handle map movement when coordinates change
const MapController: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 13, { duration: 1.5 });
  }, [center, map]);
  return null;
};

export const Map: React.FC<MapProps> = ({ geoData }) => {
  if (!geoData) return <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">Loading Map...</div>;

  const [lat, lng] = geoData.loc.split(',').map(Number);
  const position: [number, number] = [lat, lng];

  return (
    <div className="w-full h-full relative z-0">
       <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={true} 
        className="w-full h-full"
        zoomControl={false} // We can hide default zoom control for cleaner look or keep it
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" // Using Carto Light for that clean "Lamar" look
        />
        <Marker position={position}>
          <Popup>
            <div className="text-center">
              <h3 className="font-bold text-lamar-green">{geoData.city}</h3>
              <p>{geoData.org}</p>
              <p className="text-xs text-gray-500">{geoData.ip}</p>
            </div>
          </Popup>
        </Marker>
        <MapController center={position} />
      </MapContainer>
    </div>
  );
};