import { AgeGroup, Level, Size } from '@constants/enums.js';
import Pet from '@entities/pet.js';
import { NotFoundException } from '@errors/NotFoundException.js';
import { InMemoryOrgRepository } from '@repositories/in-memory/InMemoryOrgRepository.js';
import { InMemoryPetRepository } from '@repositories/in-memory/InMemoryPetRepository.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { FindPetByIdUseCase } from './findPetByIdUseCase.js';

let petRepository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: FindPetByIdUseCase;

describe('#FindPetByIdUseCase', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    sut = new FindPetByIdUseCase(petRepository);
  });

  it('should find a pet by its ID', async () => {
    const petData = {
      id: '123',
      name: 'Rex',
      age: AgeGroup.YOUNG,
      about: 'Very friendly and playful',
      energyLevel: Level.HIGH,
      independenceLevel: Level.LOW,
      roomSize: Size.SMALL,
      size: Size.SMALL,
      organizationId: 'org-01',
      adopted: false,
      photos: [],
      requirements: [],
    };

    await petRepository.create(new Pet(petData));

    const result = await sut.execute('123');

    expect(result).toEqual(petData);
  });

  it("should throw an error if pet doesn't exist", async () => {
    expect(async () => await sut.execute('456')).rejects.toBeInstanceOf(
      NotFoundException
    );
  });
});
