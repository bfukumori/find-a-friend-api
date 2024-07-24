import { faker } from '@faker-js/faker';
import { AgeGroup, Level, Size } from '@src/@core/domain/constants/enums.js';
import Pet from '@src/@core/domain/entities/pet.js';
import { randomUUID } from 'node:crypto';

export default class PetTestBuilder {
  #petData: Pet;

  constructor() {
    this.#petData = {
      id: randomUUID(),
      name: faker.animal.cat(),
      about: faker.lorem.paragraph(),
      age: faker.helpers.enumValue(AgeGroup),
      energyLevel: faker.helpers.enumValue(Level),
      independenceLevel: faker.helpers.enumValue(Level),
      roomSize: faker.helpers.enumValue(Size),
      size: faker.helpers.enumValue(Size),
      organizationId: randomUUID(),
    };
  }

  static aPet() {
    return new PetTestBuilder();
  }

  withCustomOrgId(orgId: string) {
    this.#petData.organizationId = orgId;
    return this;
  }

  build() {
    const pet = new Pet(this.#petData);

    return pet;
  }
}
