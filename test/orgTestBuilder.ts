import Organization from '@entities/organization.js';
import { faker } from '@faker-js/faker';
import { randomUUID } from 'node:crypto';

export default class OrgTestBuilder {
  #orgData: Organization;

  constructor() {
    this.#orgData = {
      id: randomUUID(),
      owner: faker.person.fullName(),
      email: faker.internet.email(),
      postalCode: faker.location.zipCode('########'),
      addressName: faker.location.streetAddress(),
      addressNumber: faker.location.buildingNumber(),
      neighborhood: faker.location.direction(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      whatsapp: faker.helpers.fromRegExp('[0-9]{11}'),
      password: faker.internet.password({ length: 8 }),
    };
  }

  static aOrg() {
    return new OrgTestBuilder();
  }

  withInvalidEmail() {
    this.#orgData.email = 'invalid_email@example.com';
    return this;
  }

  withInvalidPassword() {
    this.#orgData.password = 'invalid password';
    return this;
  }

  build() {
    const org = new Organization(this.#orgData);

    return org;
  }
}
