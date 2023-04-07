#!/usr/bin/env node

import stripIndent from 'strip-indent';
import chalk from "chalk";
import {getArgValue} from "./helpers/getArgValue.js";

const handleHelp = () => {
  console.info(chalk.whiteBright(stripIndent(`
  Help info
  
  Command description:  
    default . . . . . . . . . . . show the weather
    --city, -c [CITY] . . . . . . set city [CITY]
    --token, -t [API_TOKEN] . . . set API token [API_TOKEN]
    --help, -h  . . . . . . . . . show help info 
  `)));
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

  console.info(chalk.redBright('Unknown command: ') + chalk.bgRedBright.whiteBright(command));
  console.info('Please read the following help info:');

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
