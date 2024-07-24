import app from '@src/index.js';
import request from 'supertest';
import OrgTestBuilder from 'test/orgTestBuilder.js';
import PetTestBuilder from 'test/petTestBuilder.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should not be able to create a pet without auth', async () => {
    const pet = PetTestBuilder.aPet().build();

    const response = await request(app.server).post('/pets').send(pet);

    expect(response.status).toBe(401);
  });

  it('should create a pet', async () => {
    const org = OrgTestBuilder.aOrg().build();

    const createOrgResponse = await request(app.server).post('/orgs').send(org);

    const authResponse = await request(app.server)
      .post('/orgs/auth')
      .send({ email: org.email, password: org.password });

    const pet = PetTestBuilder.aPet()
      .withCustomOrgId(createOrgResponse.body.org.id)
      .build();

    const createPetResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet);

    expect(createPetResponse.status).toBe(201);
  });
});
