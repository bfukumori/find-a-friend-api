import { app } from '@src/app.js';
import request from 'supertest';
import OrgTestBuilder from 'test/orgTestBuilder.js';
import PetTestBuilder from 'test/petTestBuilder.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Find pet by id (Integration test)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get pet details', async () => {
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

    const response = await request(app.server).get(
      `/pets/${createPetResponse.body.pet.id}`
    );

    expect(response.status).toBe(200);
  });

  it('should throw error with invalid input', async () => {
    const petId = 'invalid-id';

    const response = await request(app.server).get(`/pets/${petId}`);

    expect(response.status).toBe(400);
  });

  it('should throw error if pet not found', async () => {
    const petId = '003cac32-e8a8-4f15-ab6f-6c6a863b9623';

    const response = await request(app.server).get(`/pets/${petId}`);

    expect(response.status).toBe(422);
  });
});
