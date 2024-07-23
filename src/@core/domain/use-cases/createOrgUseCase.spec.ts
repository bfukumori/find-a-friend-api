import { AlreadyExists } from '@errors/AlreadyExists.js';
import { InMemoryOrgRepository } from '@repositories/in-memory/InMemoryOrgRepository.js';
import { BCryptService } from '@services/BCryptService.js';
import { IEncrypter } from '@services/interfaces/IEncrypter.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateOrgUseCase } from './createOrgUseCase.js';

let orgRepository: InMemoryOrgRepository;
let encrypter: IEncrypter;
let sut: CreateOrgUseCase;

describe('#CreateOrgUseCase', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    encrypter = new BCryptService();
    sut = new CreateOrgUseCase(orgRepository, encrypter);
  });

  it('should create a org', async () => {
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

    await sut.execute(orgData);

    const result = Array.from(orgRepository.items);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBeDefined();
    expect(result[0].owner).toEqual('John Doe');
    expect(result[0].email).toEqual('johndoe@example.com');
  });

  it('should throw an error if an org already exists', async () => {
    let orgData = {
      owner: 'John Doe',
      email: 'johndoe@example.com', // must be unique
      postalCode: '12345',
      addressName: 'Av. Paulista',
      addressNumber: '1234',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      latitude: 123.456,
      longitude: 123.456,
      whatsapp: '1234567890', // must be unique
      password: '123456',
    };

    await sut.execute(orgData);

    // Should throw an error because the email is the same
    expect(async () => await sut.execute(orgData)).rejects.toBeInstanceOf(
      AlreadyExists
    );

    orgData.email = 'other_email@example.com';

    // Should throw an error because the whatsapp number is the same
    expect(async () => await sut.execute(orgData)).rejects.toBeInstanceOf(
      AlreadyExists
    );
  });
});
