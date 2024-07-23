import { ClientError } from './ClientError.js';

export class NotFoundException extends ClientError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundException';
  }
}
