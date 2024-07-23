import { ClientError } from './ClientError.js';

export class NotFoundException extends ClientError {
  constructor(message: string) {
    super(message, 422);
    this.name = 'NotFoundException';
  }
}
