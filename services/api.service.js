import axios from 'axios';
import {
  getCityFromStorage,
  getTokenFromStorage,
} from './storage.service.js';
import {
  validateCityInput,
  validateTokenInput,
} from './validator.service.js';

const API_URL = 'https://api.openweathermap.org/data/2.5/';
const API_TIMEOUT = 5000;

const CURRENT_WEATHER_API_ENDPOINT = 'weather';

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: API_TIMEOUT,
});

const adaptCurrentWeatherParamsToServer = ({city, token}) => {
  validateTokenInput(token);
  validateCityInput(city);

  return ({
    q: city,
    appid: token,
  });
};

const adaptCurrentWeatherDataToClient = (serverCurrentWeatherData) => ({
  name: serverCurrentWeatherData.name,
  main: serverCurrentWeatherData.main,
  weather: serverCurrentWeatherData.weather,
  wind: serverCurrentWeatherData.wind,
  clouds: serverCurrentWeatherData.clouds,
  visibility: serverCurrentWeatherData.visibility,
});

const getCurrentWeather = async () => {
  const clientParams = {
    city: await getCityFromStorage(),
    token: await getTokenFromStorage(),
  };

  const params = adaptCurrentWeatherParamsToServer(clientParams);

  const {data: serverCurrentWeatherData} = await axiosInstance.get(CURRENT_WEATHER_API_ENDPOINT, {
    params,
  });

  return adaptCurrentWeatherDataToClient(serverCurrentWeatherData);
};

export {
  getCurrentWeather,
};