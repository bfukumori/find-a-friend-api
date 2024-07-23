import { describe, expect, it } from 'vitest';
import Organization from './organization.js';

describe('#Organization', () => {
  it('should create a new organization', () => {
    const organization = new Organization({
      id: '123',
      owner: 'John Doe',
      email: 'johndoe@example.com',
      postalCode: '12345678',
      addressName: 'Rua dos Nhambiquaras',
      addressNumber: '123',
      neighborhood: 'Moema',
      city: 'São Paulo',
      state: 'SP',
      latitude: -23.6078907,
      longitude: -46.660169,
      whatsapp: '11123456789',
      password: '123456',
    });

    expect(organization.id).toEqual('123');
    expect(organization.owner).toEqual('John Doe');
  });
});
