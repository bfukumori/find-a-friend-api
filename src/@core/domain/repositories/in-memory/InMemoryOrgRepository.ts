import Organization from '@entities/organization.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';

export class InMemoryOrgRepository implements IOrgRepository {
  items: Set<Organization> = new Set();

  async create(org: Organization): Promise<Organization> {
    this.items.add(org);

    return org;
  }

  async findByEmail(email: string): Promise<Organization | null> {
    return (
      Array.from(this.items).find(
        (org) => org.email.toLowerCase().trim() === email.toLowerCase().trim()
      ) ?? null
    );
  }

  async findById(id: string): Promise<Organization | null> {
    return Array.from(this.items).find((org) => org.id === id) ?? null;
  }
}
