import app from '@src/index.js';
import request from 'supertest';
import OrgTestBuilder from 'test/orgTestBuilder.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an org', async () => {
    const org = OrgTestBuilder.aOrg().build();

    const response = await request(app.server).post('/orgs').send(org);

    expect(response.status).toBe(201);
  });

  it('should throw an error if org has already been created', async () => {
    const org = OrgTestBuilder.aOrg().build();

    await request(app.server).post('/orgs').send(org);

    const response = await request(app.server).post('/orgs').send(org);

    expect(response.status).toBe(409);
  });
});
