import { AlreadyExists } from '@errors/AlreadyExists.js';
import { InMemoryOrgRepository } from '@repositories/in-memory/InMemoryOrgRepository.js';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateOrgUseCase } from './createOrgUseCase.js';
import { CreateOrgDTO } from './dto/createOrgDTO.js';

let orgRepository: InMemoryOrgRepository;
let sut: CreateOrgUseCase;

describe('#CreateOrgUseCase', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    sut = new CreateOrgUseCase(orgRepository);
  });

  it('should create a org', async () => {
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

    await sut.execute(orgData);

    const result = Array.from(orgRepository.items);

    expect(result).toHaveLength(1);
    expect(result[0].props.owner).toEqual('John Doe');
    expect(result[0].props.email).toEqual('johndoe@example.com');
  });

  it('should throw an error if org already exists', async () => {
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

    await sut.execute(orgData);

    expect(async () => await sut.execute(orgData)).rejects.toBeInstanceOf(
      AlreadyExists
    );
  });
});
