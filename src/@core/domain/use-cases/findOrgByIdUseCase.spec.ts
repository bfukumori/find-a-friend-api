import Organization from '@entities/organization.js';
import { NotFoundException } from '@errors/NotFoundException.js';
import { InMemoryOrgRepository } from '@repositories/in-memory/InMemoryOrgRepository.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { FindOrgByIdUseCase } from './findOrgByIdUseCase.js';

let orgRepository: InMemoryOrgRepository;
let sut: FindOrgByIdUseCase;

describe('#FindOrgByIdUseCase', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    sut = new FindOrgByIdUseCase(orgRepository);
  });

  it('should find a org by its email', async () => {
    const orgData = {
      id: '123',
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
    };

    await orgRepository.create(new Organization(orgData));

    const result = await sut.execute('123');

    expect(result).toEqual(orgData);
  });

  it("should throw an error if org doesn't exist", async () => {
    expect(async () => await sut.execute('456')).rejects.toBeInstanceOf(
      NotFoundException
    );
  });
});
