import { ClientError } from './ClientError.js';

export class InvalidCredentials extends ClientError {
  constructor() {
    super('Invalid credentials', 401);
    this.name = 'InvalidCredentials';
  }
}
