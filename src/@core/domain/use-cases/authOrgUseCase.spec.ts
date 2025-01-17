import Organization from '@entities/organization.js';
import { InvalidCredentials } from '@errors/InvalidCredentials.js';
import { InMemoryOrgRepository } from '@repositories/in-memory/InMemoryOrgRepository.js';
import { BCryptService } from '@services/BCryptService.js';
import { IEncrypter } from '@services/interfaces/IEncrypter.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { AuthOrgUseCase } from './authOrgUseCase.js';
import { CreateOrgUseCase } from './createOrgUseCase.js';

let orgRepository: InMemoryOrgRepository;
let createOrgUseCase: CreateOrgUseCase;
let sut: AuthOrgUseCase;
let encrypter: IEncrypter;

describe('#AuthOrgUseCase', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    encrypter = new BCryptService();
    createOrgUseCase = new CreateOrgUseCase(orgRepository, encrypter);
    sut = new AuthOrgUseCase(orgRepository, encrypter);
  });

  it('should authenticate an org', async () => {
    const orgData = {
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
    const result = await sut.execute({
      email: orgData.email,
      password: orgData.password,
    });

    expect(result).toBeInstanceOf(Organization);
  });

  it('should throw an error with invalid credentials', async () => {
    const orgData = {
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
        await sut.execute({
          email: 'johndoe@example.com',
          password: 'wrong-password',
        })
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });

  it("should throw an error when org doesn't exist", async () => {
    const orgData = {
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
        await sut.execute({ email: 'inexistent email', password: '123456' })
    ).rejects.toBeInstanceOf(InvalidCredentials);
  });
});
