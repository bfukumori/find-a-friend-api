import Organization from '@entities/organization.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';
import { prisma } from '../libs/prisma.js';

export class PrismaOrgRepository implements IOrgRepository {
  async create(org: Organization): Promise<Organization> {
    const result = await prisma.organization.create({
      data: org,
    });

    return result;
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const result = await prisma.organization.findUnique({
      where: {
        email,
      },
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async findById(id: string): Promise<Organization | null> {
    const result = await prisma.organization.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      return null;
    }

    return result;
  }
}
