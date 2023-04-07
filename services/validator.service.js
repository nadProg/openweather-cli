const validateInputString = (string, name = 'string') => {
  const formattedName = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;

  if (typeof string !== 'string') {
    throw new Error(`${formattedName} must be a string`);
  }

  if (!string) {
    throw new Error(`${name} must not be empty string`);
  }
};
const validateTokenInput = (token) => {
  validateInputString(token, 'token');
};

const validateCityInput = (city) => {
  validateInputString(city, 'city');

  const isCityValid = /^[A-Za-z ]*$/.test(city);

  if (!isCityValid) {
    throw new Error('Only english letters and spaces are allowed in a city name');
  }
};

export {
  validateTokenInput,
  validateCityInput,
};