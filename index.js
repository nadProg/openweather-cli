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
  StorageKey,
  setValueInStorage,
} from './services/storage.service.js';
import {
  validateCityInput,
  validateTokenInput,
} from './services/validator.service.js';

const handleHelp = () => {
  printHelp();
};

const handleCity = async (city) => {
  validateCityInput(city);

  printInfo('Saving city...');
  await setValueInStorage(StorageKey.CITY, city.toLowerCase());
  printSuccess('City saved');
};

const handleToken = async (token) => {
  validateTokenInput(token);

  printInfo('Saving token...');
  await setValueInStorage(StorageKey.TOKEN, token);
  printSuccess('Token saved');
};

const handleMain = () => {
  printInfo('Main handler');
  printSuccess('Main handler');
  printError('Main handler');
};

const handleDefault = () => {
  const command = getCommand();

  if (!command) {
    handleMain();
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
