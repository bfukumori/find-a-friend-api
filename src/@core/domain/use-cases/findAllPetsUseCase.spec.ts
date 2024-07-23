import { AgeGroup, Level, Size } from '@constants/enums.js';
import Pet from '@entities/pet.js';
import { InMemoryOrgRepository } from '@repositories/in-memory/InMemoryOrgRepository.js';
import { InMemoryPetRepository } from '@repositories/in-memory/InMemoryPetRepository.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { FindAllPetsUseCase } from './findAllPetsUseCase.js';

let petRepository: InMemoryPetRepository;
let orgRepository: InMemoryOrgRepository;
let sut: FindAllPetsUseCase;

describe('#FindAllPetsUseCase', () => {
  beforeEach(async () => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgRepository);
    sut = new FindAllPetsUseCase(petRepository);

    await orgRepository.create({
      id: 'org-01',
      owner: 'Org 01',
      city: 'City 01',
      state: 'State 01',
      addressName: 'Address 01',
      addressNumber: '123',
      neighborhood: 'Neighborhood 01',
      postalCode: '123456',
      latitude: 123,
      longitude: 123,
      whatsapp: 'Phone 01',
      email: 'Email 01',
      password: '123456',
    });

    await orgRepository.create({
      id: 'org-02',
      owner: 'Org 02',
      city: 'City 02',
      state: 'State 02',
      addressName: 'Address 02',
      addressNumber: '456',
      neighborhood: 'Neighborhood 02',
      postalCode: '123456',
      latitude: 456,
      longitude: 456,
      whatsapp: 'Phone 02',
      email: 'Email 02',
      password: '123456',
    });

    await orgRepository.create({
      id: 'org-03',
      owner: 'Org 03',
      city: 'City 01',
      state: 'State 03',
      addressName: 'Address 03',
      addressNumber: '456',
      neighborhood: 'Neighborhood 03',
      postalCode: '123456',
      latitude: 789,
      longitude: 789,
      whatsapp: 'Phone 03',
      email: 'Email 03',
      password: '123456',
    });

    await petRepository.create(
      new Pet({
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
      })
    );

    await petRepository.create(
      new Pet({
        id: '456',
        name: 'Bob',
        age: AgeGroup.ADULT,
        about: 'Very scared',
        energyLevel: Level.MEDIUM,
        independenceLevel: Level.HIGH,
        roomSize: Size.LARGE,
        size: Size.LARGE,
        organizationId: 'org-01',
        adopted: false,
        photos: [],
        requirements: [],
      })
    );

    await petRepository.create(
      new Pet({
        id: '789',
        name: 'Mike',
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
      })
    );
  });

  it('should find all pets in a city', async () => {
    const result = await sut.execute({
      city: 'City 01',
    });

    const expected = [
      {
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
      },
      {
        id: '456',
        name: 'Bob',
        age: AgeGroup.ADULT,
        about: 'Very scared',
        energyLevel: Level.MEDIUM,
        independenceLevel: Level.HIGH,
        roomSize: Size.LARGE,
        size: Size.LARGE,
        organizationId: 'org-01',
        adopted: false,
        photos: [],
        requirements: [],
      },
      {
        id: '789',
        name: 'Mike',
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
      },
    ];

    expect(result).toEqual(expected);
  });

  it('should return an empty array if there is no pets in a city', async () => {
    const result = await sut.execute({
      city: 'City 04',
    });

    expect(result).toHaveLength(0);
  });

  it('should find all pets by its characteristics', async () => {
    const result1 = await sut.execute({
      city: 'City 01',
      age: AgeGroup.ADULT,
    });

    expect(result1).toHaveLength(1);
    expect(result1[0].id).toBe('456');

    const result2 = await sut.execute({
      city: 'City 01',
      age: AgeGroup.YOUNG,
    });
    expect(result2).toHaveLength(2);

    const result3 = await sut.execute({
      city: 'City 01',
      energyLevel: Level.MEDIUM,
    });
    expect(result3).toHaveLength(1);
    expect(result3[0].id).toBe('456');

    const result4 = await sut.execute({
      city: 'City 01',
      independenceLevel: Level.HIGH,
    });
    expect(result4).toHaveLength(1);

    const result5 = await sut.execute({
      city: 'City 01',
      size: Size.SMALL,
    });
    expect(result5).toHaveLength(2);
  });
});
