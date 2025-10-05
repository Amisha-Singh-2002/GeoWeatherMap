# Geo Weather Map

[Live Demo](https://geo-weather-map-lemon.vercel.app/)

> A React-based weather app that lets users explore weather by city name, coordinates, or map click — built with Tailwind CSS, Material-UI, and React Leaflet.

---

## 🔍 Demo & Screenshot

You can try the live app here: [Geo Weather Map](https://geo-weather-map-lemon.vercel.app/)

*(Insert screenshot or GIF here to show the UI if you like)*

---

## 🧰 Tech Stack

| Layer            | Technologies / Libraries                       |
|------------------|-------------------------------------------------|
| Frontend         | React, React Hooks                             |
| Styling & UI     | Tailwind CSS, Material-UI                      |
| Map              | React Leaflet                                  |
| State Management | React Context API                              |
| API              | OpenWeatherMap (or your chosen weather API)     |

---

## 🚀 Features

1. **Search by City Name**  
   Users can type a city name and get the current weather, temperature, humidity, and city details.

2. **Search by Coordinates**  
   Users can enter latitude and longitude to fetch weather data for a specific location.

3. **Interactive Map Search**  
   The map tab lets users click anywhere on the map to fetch weather data for those coordinates:
   - Captures the lat & long of the click.
   - Stores them globally using Context API.
   - A `useEffect` listens for changes and fetches up-to-date weather info.

---

## 📁 Project Structure (suggested)

