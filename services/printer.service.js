import chalk from 'chalk';
import stripIndent from 'strip-indent';

export const printError = (text = '') => {
  console.error(`${chalk.bgRedBright.whiteBright('ERROR:')} ${chalk.redBright(text)}`);
};

export const printSuccess = (text = '') => {
  console.info(`${chalk.bgGreenBright.whiteBright('SUCCESS:')} ${chalk.greenBright(text)}`);
};

export const printInfo = (text = '') => {
  console.info(`${chalk.bgCyanBright.whiteBright('INFO:')} ${chalk.cyanBright(text)}`);
};

export const printHelp = () => {
  console.info(chalk.whiteBright(stripIndent(`
  Help info
  
  Command description:  
    default . . . . . . . . . . . show the weather
    --city, -c [CITY] . . . . . . set city [CITY]
    --token, -t [API_TOKEN] . . . set API token [API_TOKEN]
    --help, -h  . . . . . . . . . show help info 
  `)));
};

export const printUnknownCommand = (command) => {
  console.info(chalk.redBright('Unknown command: ') + chalk.bgRedBright.whiteBright(command));
  console.info('Please read the following help info:');

  printHelp();
};