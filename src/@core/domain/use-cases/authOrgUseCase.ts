import { InvalidCredentials } from '@errors/InvalidCredentials.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';
import { IEncrypter } from '@services/interfaces/IEncrypter.js';
import { app } from 'src/@core/infra/libs/fastify.js';
import { AuthOrgRequestDTO } from './dto/authOrgDTO.js';

export class AuthOrgUseCase {
  constructor(
    private readonly orgRepository: IOrgRepository,
    private readonly encrypter: IEncrypter
  ) {}

  async execute({ email, password }: AuthOrgRequestDTO): Promise<void> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentials('Invalid credentials');
    }

    const isValid = await this.encrypter.compare(password, org.password);

    if (!isValid) {
      throw new InvalidCredentials('Invalid credentials');
    }

    app.jwt.sign({ orgId: org.id });
  }
}
