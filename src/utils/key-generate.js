import crypto from 'crypto';

const randomString = crypto
  .randomBytes(16)
  .toString('hex');

console.log(randomString);
