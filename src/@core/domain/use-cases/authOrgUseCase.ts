import { InvalidCredentials } from '@errors/InvalidCredentials.js';
import { NotFoundException } from '@errors/NotFoundException.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';
import { compare } from 'bcrypt-ts';

export class AuthOrgUseCase {
  constructor(private readonly orgRepository: IOrgRepository) {}

  async execute(email: string, password: string): Promise<void> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    const isValid = await compare(password, org.password);

    if (!isValid) {
      throw new InvalidCredentials('Invalid credentials');
    }
  }
}
