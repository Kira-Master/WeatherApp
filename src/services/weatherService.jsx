// src/services/weatherService.js
const API_KEY = '9750031540dcb33a58325e469579efb2'; // Replace with your actual API key
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchWeather = async (city) => {
  try {
    const response = await fetch(`${WEATHER_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found');
      } else {
        throw new Error('Failed to fetch weather data');
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchForecast = async (city) => {
  try {
    const response = await fetch(`${FORECAST_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found');
      } else {
        throw new Error('Failed to fetch forecast data');
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
