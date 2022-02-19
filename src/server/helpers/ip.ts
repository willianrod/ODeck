/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import os from 'os';

const interfaces = os.networkInterfaces();

export const getIps = () => {
  const addresses = [];
  for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
      const address = interfaces[k][k2];
      if (address.family === 'IPv4' && !address.internal) {
        addresses.push(address.address);
      }
    }
  }

  return addresses;
};

export default null;
