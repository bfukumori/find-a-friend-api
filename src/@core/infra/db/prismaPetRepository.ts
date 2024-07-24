import Pet from '@entities/pet.js';
import {
  FindAllParams,
  IPetRepository,
} from '@repositories/interfaces/IPetRepository.js';
import { prisma } from '../libs/prisma.js';

export class PrismaPetRepository implements IPetRepository {
  async create(pet: Pet): Promise<Pet> {
    const result = await prisma.pet.create({
      data: pet,
    });

    return result;
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const result = await prisma.pet.findMany({
      where: {
        AND: {
          organization: {
            city: params.city,
          },
        },
        age: params.age,
        energyLevel: params.energyLevel,
        size: params.size,
        independenceLevel: params.independenceLevel,
      },
    });

    return result;
  }

  async findById(id: string): Promise<Pet | null> {
    const result = await prisma.pet.findUnique({
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
