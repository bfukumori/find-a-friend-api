import Organization from '@entities/organization.js';
import { InvalidCredentials } from '@errors/InvalidCredentials.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';
import { IEncrypter } from '@services/interfaces/IEncrypter.js';

export type AuthOrgRequest = {
  email: string;
  password: string;
};

export class AuthOrgUseCase {
  constructor(
    private readonly orgRepository: IOrgRepository,
    private readonly encrypter: IEncrypter
  ) {}

  async execute({ email, password }: AuthOrgRequest): Promise<Organization> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentials();
    }

    const isValid = await this.encrypter.compare(password, org.password);

    if (!isValid) {
      throw new InvalidCredentials();
    }

    return org;
  }
}
