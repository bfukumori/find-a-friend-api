import Pet from '@entities/pet.js';
import { InMemoryOrgRepository } from '@repositories/in-memory/InMemoryOrgRepository.js';
import { InMemoryPetRepository } from '@repositories/in-memory/InMemoryPetRepository.js';
import { describe, expect, it } from 'vitest';
import { CreatePetUseCase } from './createPetUseCase.js';
import { CreatePetDTO } from './dto/createPetDTO.js';

describe('#CreatePetUseCase', () => {
  it('should create a pet', async () => {
    const orgRepository = new InMemoryOrgRepository();
    const petRepository = new InMemoryPetRepository(orgRepository);
    const createPetUseCase = new CreatePetUseCase(petRepository);

    const petData: CreatePetDTO = {
      name: 'Rex',
      age: 'YOUNG',
      about: 'Very friendly and playful',
      energyLevel: 'HIGH',
      independenceLevel: 'LOW',
      roomSize: 'SMALL',
      size: 'SMALL',
      organizationId: 'org-01',
    };

    await createPetUseCase.execute(petData);

    const result = Array.from(petRepository.items);

    const expected: Pet[] = [
      {
        id: expect.any(String),
        props: {
          ...petData,
          photos: [],
          requirements: [],
          adopted: false,
        },
      },
    ];
    expect(result).toHaveLength(1);
    expect(result).toEqual(expected);
  });
});
