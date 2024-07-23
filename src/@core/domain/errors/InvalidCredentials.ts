import { ClientError } from './ClientError.js';

export class InvalidCredentials extends ClientError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidCredentials';
  }
}
