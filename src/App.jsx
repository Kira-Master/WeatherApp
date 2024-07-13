// src/App.jsx
import React, { useState, useEffect } from 'react';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import { fetchWeather, fetchForecast } from './services/weatherService';
import './styles/App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('London');
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);
      setLoading(false);
      if (weatherData && forecastData) {
        setWeather(weatherData);
        setForecast(forecastData.list.filter((_, index) => index % 8 === 0));
        setError('');
      } else {
        setError('Failed to fetch weather or forecast data');
      }
    };
    getWeatherData();
  }, [city]);

  const handleSearch = () => {
    setWeather(null);
    setForecast(null);
    setError('');
    setCity(city.trim());
  };

  const handleAddFavorite = () => {
    if (!favorites.includes(city)) {
      const updatedFavorites = [...favorites, city];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const handleRemoveFavorite = (favCity) => {
    const updatedFavorites = favorites.filter((favorite) => favorite !== favCity);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleFavoriteClick = (favCity) => {
    setCity(favCity);
  };

  return (
    <div className="App">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Loading...' : 'Get Weather'}
      </button>
      <button onClick={handleAddFavorite} disabled={loading || favorites.includes(city)}>
        Add to Favorites
      </button>
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} />}
      {forecast && <ForecastCard forecast={forecast} />}
      
      {favorites.length > 0 && (
        <div className="favorites">
          <h2>Favorite Cities</h2>
          <ul>
            {favorites.map((favCity, index) => (
              <li key={index}>
                <button onClick={() => handleFavoriteClick(favCity)}>{favCity}</button>
                <button onClick={() => handleRemoveFavorite(favCity)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
