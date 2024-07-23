import Organization from '@entities/organization.js';
import { AlreadyExists } from '@errors/AlreadyExists.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';
import { hash } from 'bcrypt-ts';
import { CreateOrgDTO } from './dto/createOrgDTO.js';

export class CreateOrgUseCase {
  constructor(private readonly orgRepository: IOrgRepository) {}

  async execute(orgData: CreateOrgDTO): Promise<void> {
    const alreadyExists = await this.orgRepository.findByEmail(orgData.email);

    if (alreadyExists) {
      throw new AlreadyExists('Organization already exists');
    }

    const hashedPassword = await hash(orgData.password, 10);

    const org = new Organization({ ...orgData, password: hashedPassword });

    await this.orgRepository.create(org);
  }
}