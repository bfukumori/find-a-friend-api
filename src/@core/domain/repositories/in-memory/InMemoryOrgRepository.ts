import Organization from '@entities/organization.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';

export class InMemoryOrgRepository implements IOrgRepository {
  items: Set<Organization> = new Set();

  async create(org: Organization): Promise<void> {
    this.items.add(org);
  }

  async findByEmail(email: string): Promise<Organization | null> {
    return (
      Array.from(this.items).find(
        (org) =>
          org.props.email.toLowerCase().trim() === email.toLowerCase().trim()
      ) ?? null
    );
  }

  async findById(id: string): Promise<Organization | null> {
    return Array.from(this.items).find((org) => org.id === id) ?? null;
  }
}
