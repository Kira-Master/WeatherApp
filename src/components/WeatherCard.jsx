// src/components/WeatherCard.jsx
import React from 'react';

const WeatherCard = ({ weather }) => {
  return (
    <div className="weather-card">
      <h2>{weather.name}</h2>
      <p className="temp">{weather.main.temp} °C</p>
      <p className="desc">{weather.weather[0].description}</p>
      <div className="details">
        <p>Humidity: {weather.main.humidity} %</p>
        <p>Wind Speed: {weather.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherCard;
