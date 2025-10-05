import React, {useState} from "react";
import { WeatherContext } from "./Context/WeatherContext";
import { useContext } from "react";

const City=()=>{
  let [latitude, setLatitude]=useState("");
  let [longitude, setLongitude]=useState(0);
  const [weather, setWeather]=useState(null);
  const [err, setErr]=useState("")
  const {setDes}=useContext(WeatherContext)
  let Lat=(e)=>{
    setLatitude(e.target.value);
  }
  let Lon=(e)=>{
    setLongitude(e.target.value);
  }
  async function getData(e) {
  e.preventDefault(); // Prevent form submission rel
//   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=01893ed4e5d627588698eed6cfeafec1&units=metric`;
const url=`https://api.openweathermap.org/data/2.5/weather?q=${latitude}&appid=01893ed4e5d627588698eed6cfeafec1`
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    setWeather(result);
    setDes(result.weather[0].description)
    setErr("");
  } catch (error) {
    setErr(error.message);
    setWeather(null);
  }
}
  return (
   

       <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 sm:p-6 md:p-10 shadow-lg text-center max-w-4xl mx-auto w-full">
        <form onSubmit={getData}>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 sm:mb-4">Weather App</h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-4">Check the weather in your city!</p>
        <input 
          onChange={Lat} 
          className='w-full sm:w-64 md:w-80 h-10 sm:h-12 border rounded m-2 sm:m-5 px-4 text-base' 
          type='text' 
          value={latitude} 
          placeholder='Type City'
        />
        <button 
          type="submit" 
          className="text-white bg-black m-2 sm:m-4 w-full sm:w-32 md:w-36 h-10 sm:h-12 rounded hover:bg-gray-800 transition"
        >
          Get Weather
        </button>
        </form>
        
        {err ?( <p className="text-red-500 mt-2 text-sm sm:text-base">{err}</p>)
        
        : weather ?(
          <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-white/70 to-blue-100/70 backdrop-blur-md border border-white/40 w-full mx-auto">
  <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-2 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2">
    <span>{weather.name},</span> <span className="text-blue-600">{weather.sys.country}</span>
  </h2>
  <p className="text-gray-600 text-base sm:text-lg italic mb-4 capitalize">
    {weather.weather[0].description}
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-700 text-sm sm:text-base">
    <div className="flex items-center space-x-2">
      <span className="text-xl sm:text-2xl">🌡️</span>
      <p><span className="font-semibold">Temperature:</span> {Math.round(weather.main.temp-(273))}°C</p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-xl sm:text-2xl">🤔</span>
      <p><span className="font-semibold">Feels Like:</span> {Math.round(weather.main.feels_like-(273))}°C</p>
    </div>

    <div className="flex items-center space-x-2">
      <span className="text-xl sm:text-2xl">💧</span>
      <p><span className="font-semibold">Humidity:</span> {weather.main.humidity}%</p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-xl sm:text-2xl">🧭</span>
      <p><span className="font-semibold">Wind Speed:</span> {weather.wind.speed} m/s</p>
    </div>

    <div className="flex items-center space-x-2">
      <span className="text-xl sm:text-2xl">↗️</span>
      <p><span className="font-semibold">Wind Direction:</span> {weather.wind.deg}°</p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-xl sm:text-2xl">📊</span>
      <p><span className="font-semibold">Pressure:</span> {weather.main.pressure} hPa</p>
    </div>

    <div className="flex items-center space-x-2">
      <span className="text-xl sm:text-2xl">🌅</span>
      <p className="text-xs sm:text-sm md:text-base"><span className="font-semibold">Sunrise:</span> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
    </div>
    <div className="flex items-center space-x-2">
      <span className="text-xl sm:text-2xl">🌇</span>
      <p className="text-xs sm:text-sm md:text-base"><span className="font-semibold">Sunset:</span> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
    </div>
  </div>
</div>

        ):null}
      </div>
  
  )

}
export default City;