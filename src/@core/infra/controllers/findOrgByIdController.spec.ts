import app from '@src/index.js';
import request from 'supertest';
import OrgTestBuilder from 'test/orgTestBuilder.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Find org by id (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get org details', async () => {
    const org = OrgTestBuilder.aOrg().build();

    const createOrgResponse = await request(app.server).post('/orgs').send(org);

    const response = await request(app.server).get(
      `/orgs/${createOrgResponse.body.org.id}`
    );

    expect(response.status).toBe(200);
  });

  it('should throw error with invalid input', async () => {
    const orgId = 'invalid-id';

    const response = await request(app.server).get(`/orgs/${orgId}`);

    expect(response.status).toBe(400);
  });

  it('should throw error if org not found', async () => {
    const orgId = '13e593f0-d680-475a-8861-9274cadf766e';

    const org = OrgTestBuilder.aOrg().build();

    await request(app.server).post('/orgs').send(org);

    const response = await request(app.server).get(`/orgs/${orgId}`);

    expect(response.status).toBe(422);
  });
});
