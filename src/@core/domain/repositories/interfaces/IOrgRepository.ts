import Organization from '@entities/organization.js';

export interface IOrgRepository {
  create(org: Organization): Promise<void>;
  findByEmail(email: string): Promise<Organization | null>;
}
