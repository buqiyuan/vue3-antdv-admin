import { name } from '../../package.json';

const LIBRARY_PREFIX = `[${name}]`;

export const log = (...msg) => {
  console.log(`%c${LIBRARY_PREFIX}`, 'font-weight:bold;', ...msg);
};
