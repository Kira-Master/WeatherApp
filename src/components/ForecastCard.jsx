// src/components/ForecastCard.jsx
import React from 'react';

const ForecastCard = ({ forecast }) => {
  return (
    <div className="forecast-card">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <p className="temp">{item.main.temp} °C</p>
            <p className="desc">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
