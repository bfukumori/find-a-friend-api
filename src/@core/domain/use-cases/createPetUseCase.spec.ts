import { AgeGroup, Level, Size } from '@constants/enums.js';
import Pet from '@entities/pet.js';
import { NotFoundException } from '@errors/NotFoundException.js';
import { InMemoryOrgRepository } from '@repositories/in-memory/InMemoryOrgRepository.js';
import { InMemoryPetRepository } from '@repositories/in-memory/InMemoryPetRepository.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreatePetUseCase } from './createPetUseCase.js';

let orgRepository: InMemoryOrgRepository;
let petRepository: InMemoryPetRepository;
let sut: CreatePetUseCase;

describe('#CreatePetUseCase', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    sut = new CreatePetUseCase(petRepository, orgRepository);
  });

  it('should create a pet', async () => {
    await orgRepository.create({
      id: 'org-01',
      owner: 'John Doe',
      email: 'johndoe@example.com',
      postalCode: '12345',
      addressName: 'Av. Paulista',
      addressNumber: '1234',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      latitude: 123.456,
      longitude: 123.456,
      whatsapp: '1234567890',
      password: '123456',
    });

    const petData = {
      name: 'Rex',
      age: AgeGroup.YOUNG,
      about: 'Very friendly and playful',
      energyLevel: Level.HIGH,
      independenceLevel: Level.LOW,
      roomSize: Size.SMALL,
      size: Size.SMALL,
      organizationId: 'org-01',
    };

    await sut.execute(petData);

    const result = Array.from(petRepository.items);

    const expected: Pet[] = [
      {
        ...petData,
        id: result[0].id,
        adopted: false,
        photos: [],
        requirements: [],
      },
    ];

    expect(result).toHaveLength(1);
    expect(result).toEqual(expected);
  });

  it('should throw and error when trying create a pet without an organization', async () => {
    const petData = {
      name: 'Rex',
      age: AgeGroup.YOUNG,
      about: 'Very friendly and playful',
      energyLevel: Level.HIGH,
      independenceLevel: Level.LOW,
      roomSize: Size.SMALL,
      size: Size.SMALL,
      organizationId: 'unexistent orgId',
    };
    expect(async () => await sut.execute(petData)).rejects.toBeInstanceOf(
      NotFoundException
    );
  });
});
