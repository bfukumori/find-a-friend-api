import { app } from '@src/app.js';
import request from 'supertest';
import OrgTestBuilder from 'test/orgTestBuilder.js';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Auth Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should authenticate an org', async () => {
    const org = OrgTestBuilder.aOrg().build();

    await request(app.server).post('/orgs').send(org);

    const response = await request(app.server).post('/orgs/auth').send({
      email: org.email,
      password: org.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should throw an error with invalid email', async () => {
    const org = OrgTestBuilder.aOrg().withInvalidEmail().build();

    await request(app.server).post('/orgs').send(org);

    const response = await request(app.server).post('/orgs/auth').send({
      email: 'johndoe@example.com',
      password: org.password,
    });

    expect(response.status).toBe(401);
  });

  it('should throw an error with invalid password', async () => {
    const org = OrgTestBuilder.aOrg().withInvalidPassword().build();

    await request(app.server).post('/orgs').send(org);

    const response = await request(app.server).post('/orgs/auth').send({
      email: org.email,
      password: '123456',
    });

    expect(response.status).toBe(401);
  });
});
