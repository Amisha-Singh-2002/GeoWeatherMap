import {createContext, useState} from "react";

export const MapContext=createContext();

export default function MapContextProvider({children})
{
    const [Lat,setLat]=useState(13.084622);
    const [Long, setLong]=useState(80.248357);

    return (
        <MapContext.Provider value={{Lat, setLat, Long, setLong}}>
            {children}
        </MapContext.Provider>
    );
}