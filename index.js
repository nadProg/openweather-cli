#!/usr/bin/env node

import {getArgValue} from "./helpers/getArgValue.js";

const handleHelp = () => {
  console.info('Help handler');
};

const handleCity = () => {
  console.info('City handler');
};

const handleToken = () => {
  console.info('Token handler');
};

const handleMain = () => {
  console.info('Main handler');
}

const handleDefault = () => {
  const command = process.argv.slice(2).map(v => v.trim()).filter(Boolean).join(' ');

  if (!command) {
    handleMain();
    return;
  }

  console.info(`Unknown command: ${command}`);
  console.info('Please read the following help info.');

  handleHelp();
};

const argHandlers = {
  city: handleCity,
  token: handleToken,
  help: handleHelp,
}

const init = () => {
  for (const [command, handler] of Object.entries(argHandlers)) {
    const argValue = getArgValue(command);

    if (!argValue) {
      continue;
    }

    handler(argValue);
    return;
  }

  handleDefault();
};


init();
