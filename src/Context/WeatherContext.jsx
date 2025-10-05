import {createContext, useState} from "react";

export const WeatherContext=createContext();

export default function WeatherContextProvider({children})
{
    const [des,setDes]=useState("");
  

    return (
        <WeatherContext.Provider value={{des, setDes}}>
            {children}
        </WeatherContext.Provider>
    );
}