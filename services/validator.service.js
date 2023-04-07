const validateInputToken = (token) => {
  if (typeof token !== 'string') {
    throw new Error('Token must be a string');
  }

  if (!token) {
    throw new Error('Token must not be empty string');
  }
};

export {validateInputToken};