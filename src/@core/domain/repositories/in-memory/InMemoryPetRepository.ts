import Pet from '@entities/pet.js';
import {
  FindAllParams,
  IPetRepository,
} from '@repositories/interfaces/IPetRepository.js';
import { InMemoryOrgRepository } from './InMemoryOrgRepository.js';

export class InMemoryPetRepository implements IPetRepository {
  items: Set<Pet> = new Set();

  constructor(private readonly orgRepository: InMemoryOrgRepository) {}

  async create(pet: Pet): Promise<void> {
    this.items.add(pet);
  }

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const pets = Array.from(this.items);
    const orgs = Array.from(this.orgRepository.items);

    const orgsByCity = orgs.filter(
      (org) =>
        org.city.toLowerCase().trim() === params.city.toLowerCase().trim()
    );

    const filteredPets = pets
      .filter((pet) => orgsByCity.some((org) => org.id === pet.organizationId))
      .filter((pet) => (params.age ? pet.age === params.age : true))
      .filter((pet) =>
        params.energyLevel ? pet.energyLevel === params.energyLevel : true
      )
      .filter((pet) => (params.size ? pet.size === params.size : true))
      .filter((pet) =>
        params.independenceLevel
          ? pet.independenceLevel === params.independenceLevel
          : true
      );

    return filteredPets;
  }

  async findById(id: string): Promise<Pet | null> {
    return Array.from(this.items).find((pet) => pet.id === id) ?? null;
  }
}
