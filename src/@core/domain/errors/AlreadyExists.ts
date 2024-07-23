import { ClientError } from './ClientError.js';

export class AlreadyExists extends ClientError {
  constructor(message: string) {
    super(message);
    this.name = 'AlreadyExists';
  }
}
