import minimist from "minimist";

const validateInput = (name) => {
  if (!name) {
    throw new Error(`Empty argument name is provided`);
  }

  if (typeof name !== 'string') {
    throw new Error(`Argument name must be a string type, received ${typeof name} instead`);
  }
}

export const getArgValue = (name) => {
  validateInput(name);

  const argv = minimist(process.argv);

  const fullName = name.toLowerCase();
  const shortName = fullName[0];

  return argv[fullName] || argv[shortName];
}
