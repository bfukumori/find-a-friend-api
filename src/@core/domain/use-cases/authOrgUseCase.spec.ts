import { InvalidCredentials } from '@errors/InvalidCredentials.js';
import { NotFoundException } from '@errors/NotFoundException.js';
import { InMemoryOrgRepository } from '@repositories/in-memory/InMemoryOrgRepository.js';
import { describe, expect, it } from 'vitest';
import { AuthOrgUseCase } from './authOrgUseCase.js';
import { CreateOrgUseCase } from './createOrgUseCase.js';
import { CreateOrgDTO } from './dto/createOrgDTO.js';

describe('#AuthOrgUseCase', () => {
  it('should throw an error with invalid credentials', async () => {
    const orgRepository = new InMemoryOrgRepository();
    const createOrgUseCase = new CreateOrgUseCase(orgRepository);
    const authOrgUseCase = new AuthOrgUseCase(orgRepository);

    const orgData: CreateOrgDTO = {
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

    await createOrgUseCase.execute(orgData);

    expect(
      async () =>
        await authOrgUseCase.execute('johndoe@example.com', 'wrong-password')
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });

  it("should throw an error when org doesn't exist", async () => {
    const orgRepository = new InMemoryOrgRepository();
    const createOrgUseCase = new CreateOrgUseCase(orgRepository);
    const authOrgUseCase = new AuthOrgUseCase(orgRepository);

    const orgData: CreateOrgDTO = {
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

    await createOrgUseCase.execute(orgData);

    expect(
      async () => await authOrgUseCase.execute('inexistent email', '123456')
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
