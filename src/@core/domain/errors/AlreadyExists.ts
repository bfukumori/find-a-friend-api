export class AlreadyExists extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AlreadyExists';
  }
}
