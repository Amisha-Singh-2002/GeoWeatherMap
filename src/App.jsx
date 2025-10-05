import React from 'react'
import Home from './Home'
import MapContextProvider from './Context/MapContext'
import WeatherContextProvider from './Context/WeatherContext'

function App()
 {
  return (
    <WeatherContextProvider>
    <MapContextProvider>
        
          <Home/>
        
    </MapContextProvider>
    </WeatherContextProvider>
  )
}

export default App