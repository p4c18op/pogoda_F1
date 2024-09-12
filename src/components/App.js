import React, { useState, useEffect } from "react";
import "../components/App.css";

const PLACES = [
  { name: 'Petrozavodsk', lat: 61.7849, lon: 34.3469 },
  { name: 'Olonets', lat: 60.9847, lon: 32.9698 },
  { name: 'Murmansk', lat: 68.9792, lon: 33.0925 },
  { name: 'kem`', lat: 64.9555, lon: 34.5793     }
];

const API_KEY = '51c66dd8957b82878380989644a7270b';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const WeatherDisplay = ({ lat, lon, name }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        setError(error);
      }
    };
    fetchWeatherData();
  }, [lat, lon]);

  if (!weatherData) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;


  return (
		<div>
			<h1>
			</h1>
			<p>Current: {weatherData.city.population}</p>
		</div>
	);
};

const App = () => {
  const [activePlace, setActivePlace] = useState(0);

  return (
    <div className="App">
      {PLACES.map((place, index) => (
        <button
          key={index}
          onClick={() => setActivePlace(index)}
        >
          {place.name}
        </button>
      ))}
      <WeatherDisplay key={activePlace} lat={PLACES[activePlace].lat} lon={PLACES[activePlace].lon} name={PLACES[activePlace].name} />
    </div>
  );
};

export default App;