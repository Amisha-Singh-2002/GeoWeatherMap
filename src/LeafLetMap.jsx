import React, { useContext, useState } from "react";


import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import osm from "./osm-providers";
import { useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import { MapContext } from "./Context/MapContext";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const LeafLetMap = () => {

    const [center, setCenter] = useState({ lat: 13.084622, lng: 80.248357 });
    const [markerPosition, setMarkerPosition] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const ZOOM_LEVEL = 9;
    const mapRef = useRef();
    const {setLat, setLong}=useContext(MapContext)

    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                setMarkerPosition({ lat, lng });
                setSelectedLocation({ lat, lng });
                setLat(lat);
                setLong(lng);

                console.log('Selected location:', { lat, lng });
            },
        });

        return markerPosition === null ? null : (
            <Marker position={markerPosition}>
                <Popup>
                    <div>
                        <strong>Selected Location</strong><br/>
                        Latitude: {markerPosition.lat.toFixed(6)}<br/>
                        Longitude: {markerPosition.lng.toFixed(6)}
                    </div>
                </Popup>
            </Marker>
        );
    };

    return (
        <>
          

            <div className="row">
                <div className="col text-center">
                   
                    <p>Click on the map to place a marker and store location</p>
                    {selectedLocation && (
                        <div className="alert alert-info mt-2">
                            <strong>Selected Location:</strong><br/>
                            Latitude: {selectedLocation.lat.toFixed(6)}<br/>
                            Longitude: {selectedLocation.lng.toFixed(6)}
                        </div>
                    )}
                    <div className="col">
                        <MapContainer center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={{ height: "400px", width: "100%" }}>
                            <TileLayer
                                url={osm.maptiler.url}
                                attribution={osm.maptiler.attribution}
                            />
                            <LocationMarker />
                        </MapContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeafLetMap;