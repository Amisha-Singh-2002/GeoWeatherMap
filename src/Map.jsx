import  React, {useState, useContext, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { WeatherContext } from "./Context/WeatherContext";


import Modal from '@mui/material/Modal';
import LeafLetMap from './LeafLetMap'
import { MapContext } from './Context/MapContext';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Map() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {Lat,Long}=useContext(MapContext)
 const [weather, setWeather]=useState("");
 const [err,setErr]=useState("");
const [load, setLoad]=useState(true);
const {setDes}=useContext(WeatherContext)
  async function getData() {
   
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Long}&appid=01893ed4e5d627588698eed6cfeafec1&units=metric`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const result = await response.json();
      setWeather(result);
      setDes(result.weather[0].description)
      setLoad(false);
      setErr("");
    } catch (error) {
      setErr(error.message);
      setLoad(false);
      setWeather(null);
    }
  }
  useEffect(()=>{
      getData()
  },[Lat, Long])
  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LeafLetMap/>
        </Box>
      </Modal>
       {load?(<h1>Loading....</h1>):
        <>
         {err ?( <p className="text-red-500 mt-2">{err}</p>)
        
        : weather ?(
         <div className="mt-6 p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-white/70 to-blue-100/70 backdrop-blur-md border border-white/40 max-w-2xl mx-auto">
  <h2 className="text-3xl font-semibold text-gray-800 mb-2 flex items-center justify-between">
    {weather.name}, <span className="text-blue-600">{weather.sys.country}</span>
  </h2>
  <p className="text-gray-600 text-lg italic mb-4 capitalize">
    {weather.weather[0].description}
  </p>

  <div className="grid sm:grid-cols-2 gap-4 text-gray-700 text-base">
    <div className="flex items-center space-x-2">
      <span className="text-2xl">🌡️</span>
      <p><span className="font-semibold">Temperature:</span> {weather.main.temp}°C</p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-2xl">🤔</span>
      <p><span className="font-semibold">Feels Like:</span> {weather.main.feels_like}°C</p>
    </div>

    <div className="flex items-center space-x-2">
      <span className="text-2xl">💧</span>
      <p><span className="font-semibold">Humidity:</span> {weather.main.humidity}%</p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-2xl">🧭</span>
      <p><span className="font-semibold">Wind Speed:</span> {weather.wind.speed} m/s</p>
    </div>

    <div className="flex items-center space-x-2">
      <span className="text-2xl">↗️</span>
      <p><span className="font-semibold">Wind Direction:</span> {weather.wind.deg}°</p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-2xl">📊</span>
      <p><span className="font-semibold">Pressure:</span> {weather.main.pressure} hPa</p>
    </div>

   
    <div className="flex items-center space-x-2">
      <span className="text-2xl">🌅</span>
      <p><span className="font-semibold">Sunrise:</span> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-2xl">🌇</span>
      <p><span className="font-semibold">Sunset:</span> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
    </div>
  </div>
</div>

        ):null}
        
        </>
        }
    </div>
  );
}
