import path from 'path';
import os from 'os';
import fs from 'fs';

const STORAGE_FILE_NAME = 'weather-cli-storage.json';

const INITIAL_STORAGE = {};

const StorageKey = {
  TOKEN: 'token',
  CITY: 'city',
};

const weatherDateFilePath = path.join(os.homedir(), '.', STORAGE_FILE_NAME);

const getStorage = async () => {
  const bufferStorage = await fs.promises.readFile(weatherDateFilePath);
  const textStorage = bufferStorage.toString();
  return JSON.parse(textStorage);
};

const setStorage = async (storage) => {
  await fs.promises.writeFile(weatherDateFilePath, JSON.stringify(storage));
};

const initStorageService = async () => {
  try {
    await getStorage();
  } catch (e) {
    await setStorage(INITIAL_STORAGE);
  }
};

const setValueInStorage = async (key, value) => {
  const storage = await getStorage();
  storage[key] = value;
  await setStorage(storage);
};

const getValueFromStorage = async (key) => {
  const storage = await getStorage();
  return storage[key];
};

const getCityFromStorage = () => getValueFromStorage(StorageKey.CITY);

const getTokenFromStorage = () => getValueFromStorage(StorageKey.TOKEN);

const setCityToStorage = (city) => setValueInStorage(StorageKey.CITY, city);

const setTokenToStorage = (token) => setValueInStorage(StorageKey.TOKEN, token);

setTimeout(initStorageService);

export {
  setCityToStorage,
  setTokenToStorage,
  getCityFromStorage,
  getTokenFromStorage,
};