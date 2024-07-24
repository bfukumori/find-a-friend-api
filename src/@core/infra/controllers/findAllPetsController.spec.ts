import { app } from '@src/app.js';
import request from 'supertest';
import OrgTestBuilder from 'test/orgTestBuilder.js';
import PetTestBuilder from 'test/petTestBuilder.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Find all pets (Integration test)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should list all pets', async () => {
    const org = OrgTestBuilder.aOrg().build();

    const createOrgResponse = await request(app.server).post('/orgs').send(org);

    const authResponse = await request(app.server)
      .post('/orgs/auth')
      .send({ email: org.email, password: org.password });

    const pet = PetTestBuilder.aPet()
      .withCustomOrgId(createOrgResponse.body.org.id)
      .build();

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet);

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet);

    const response = await request(app.server)
      .get('/pets')
      .query({ city: org.city });

    expect(response.status).toBe(200);
    expect(response.body.pets).toHaveLength(2);
  });

  it('should throw error if city is not defined', async () => {
    const org = OrgTestBuilder.aOrg().build();
    const pet = PetTestBuilder.aPet().withCustomOrgId(org.id).build();

    await request(app.server).post('/orgs').send(org);

    const authResponse = await request(app.server)
      .post('/orgs/auth')
      .send({ email: org.email, password: org.password });

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet);

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(pet);

    const response = await request(app.server).get('/pets');

    expect(response.status).toBe(400);
  });
});
