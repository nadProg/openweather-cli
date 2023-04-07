#!/usr/bin/env node

import {
  getCommand,
  getArgValue,
} from './helpers/index.js';
import {
  printError,
  printHelp,
  printInfo,
  printSuccess,
  printUnknownCommand,
} from './services/printer.service.js';
import {
  setCityToStorage,
  setTokenToStorage,
} from './services/storage.service.js';
import {
  validateCityInput,
  validateTokenInput,
} from './services/validator.service.js';
import {getCurrentWeather} from './services/api.service.js';
import stripIndent from 'strip-indent';

const handleHelp = () => {
  printHelp();
};

const handleCity = async (city) => {
  validateCityInput(city);

  printInfo('Saving city...');
  await setCityToStorage(city.toLowerCase());
  printSuccess('City saved');
};

const handleToken = async (token) => {
  validateTokenInput(token);

  printInfo('Saving token...');
  await setTokenToStorage(token);
  printSuccess('Token saved');
};


const handleMain = async () => {
  printInfo('Loading current weather...');
  const currentWeather = await getCurrentWeather();

  const formatTemperature = (absoluteTemperature) => `${(absoluteTemperature - 273.15).toFixed(1)}\u00B0C`;

  const cityNameLength  = new Array(currentWeather.name.length).fill(' ').join('');

  const formattedWeather = stripIndent(`
    Current weather in ${currentWeather.name}: ${currentWeather.weather[0].main} / ${currentWeather.weather[0].description}
    Temperature:       ${cityNameLength}  ${formatTemperature(currentWeather.main.temp)} (feels like ${formatTemperature(currentWeather.main.feels_like)})
    Wind:              ${cityNameLength}  ${currentWeather.wind.speed} m/s (direction ${currentWeather.wind.deg}\u00B0)
    Pressure:          ${cityNameLength}  ${currentWeather.main.pressure} mBar
    Humidity:          ${cityNameLength}  ${currentWeather.main.humidity} %`,
  );

  printSuccess('Current weather loaded');
  console.info(formattedWeather);
};

const handleDefault = async () => {
  const command = getCommand();

  if (!command) {
    await handleMain();
    return;
  }

  printUnknownCommand(command);
};

const argHandlers = {
  city: handleCity,
  token: handleToken,
  help: handleHelp,
};

const main = async () => {
  for (const [command, handler] of Object.entries(argHandlers)) {
    const argValue = getArgValue(command);

    if (!argValue) {
      continue;
    }

    await handler(argValue);
    return;
  }

  await handleDefault();
};

(async () => {
  try {
    await main();
  } catch (e) {
    printError(e?.message || 'Unknown error');
  }
})();
