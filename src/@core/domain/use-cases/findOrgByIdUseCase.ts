import Organization from '@entities/organization.js';
import { NotFoundException } from '@errors/NotFoundException.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';

export class FindOrgByIdUseCase {
  constructor(private readonly orgRepository: IOrgRepository) {}

  async execute(id: string): Promise<Organization> {
    const org = await this.orgRepository.findById(id);

    if (!org) {
      throw new NotFoundException('Organization not found');
    }

    return org;
  }
}
