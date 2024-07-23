import { compare, hash } from 'bcrypt-ts';
import { IEncrypter } from './interfaces/IEncrypter.js';

export class BCryptService implements IEncrypter {
  async hash(password: string, salt: number): Promise<string> {
    return hash(password, salt);
  }
  async compare(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
