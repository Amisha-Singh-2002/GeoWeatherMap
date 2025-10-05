import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import City from './City.jsx';
import Weather from './Weather.jsx';
import Map from './Map.jsx';
import { WeatherContext } from './Context/WeatherContext.jsx';
import { useContext } from 'react';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');
  const { des } = useContext(WeatherContext); // weather description from context

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ✅ Unsplash image URLs for different weather types
  const getBackgroundImage = (description) => {
    if (!description) {
      return 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80")'; // default
    }

    const desc = description.toLowerCase();

    if (desc.includes('rain'))
      return 'url("https://images.unsplash.com/photo-1620385019253-b051a26048ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJhaW58ZW58MHx8MHx8fDA%3D")';
    if (desc.includes('cloud'))
      return 'url("https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1600&q=80")';
    if (desc.includes('clear'))
      return 'url("https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")';
    if (desc.includes('snow'))
      return 'url("https://plus.unsplash.com/premium_photo-1663090593977-9923cc536f3b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c25vd3xlbnwwfHwwfHx8MA%3D%3D")';
    if (desc.includes('thunderstorm'))
      return 'url("https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80")';
    if (desc.includes('drizzle'))
      return 'url("https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80")';
    if (desc.includes('mist') || desc.includes('fog'))
      return 'url("https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80")';

    return 'url("https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80")';
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center transition-all duration-700 flex justify-center items-center p-2 sm:p-4 md:p-6"
      style={{
        backgroundImage: getBackgroundImage(des),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box
        sx={{
          width: '100%',
          typography: 'body1',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: { xs: 2, sm: 3 },
          padding: { xs: 1.5, sm: 2, md: 3 },
          margin: 'auto',
          maxWidth: { xs: '100%', sm: '90%', md: '800px' },
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }}
          >
            <TabList
              onChange={handleChange}
              aria-label="weather tabs"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                  fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                  minWidth: { xs: 'auto', sm: 90 },
                  padding: { xs: '6px 8px', sm: '6px 12px', md: '6px 16px' },
                },
                '& .Mui-selected': {
                  color: 'white !important',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                },
              }}
            >
              <Tab label="By City" value="1" />
              <Tab label="By lat & lon" value="2" />
              <Tab label="By Map" value="3" />
            </TabList>
          </Box>

          <TabPanel 
            value="1" 
            sx={{ 
              padding: { xs: '12px 0', sm: '16px 0', md: '24px 0' } 
            }}
          >
            <City />
          </TabPanel>
          <TabPanel 
            value="2" 
            sx={{ 
              padding: { xs: '12px 0', sm: '16px 0', md: '24px 0' } 
            }}
          >
            <Weather />
          </TabPanel>
          <TabPanel 
            value="3" 
            sx={{ 
              padding: { xs: '12px 0', sm: '16px 0', md: '24px 0' } 
            }}
          >
            <Map />
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}