import bcrypt from 'bcrypt';

import config from '../configs/env.config';

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, config.PASSWORD_HASH_ROUNDS);
}

function isJWT(str: string): boolean {
  const parts: string[] = str.split('.');
  if (parts.length !== 3) {
    return false;
  }

  try {
    const decodedHeader: string = atob(parts[0]);
    const decodedPayload: string = atob(parts[1]);
    const decodedSignature: string = atob(parts[2]);

    JSON.parse(decodedHeader);
    JSON.parse(decodedPayload);
    JSON.parse(decodedSignature);

    return true;
  } catch (error) {
    return false;
  }
}

export { hashPassword, isJWT };
