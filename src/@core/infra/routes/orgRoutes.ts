import { authOrgController } from '@controllers/authOrgController.js';
import { createOrgController } from '@controllers/createOrgController.js';
import { findOrgByIdController } from '@controllers/findOrgByIdController.js';
import { FastifyInstance } from 'fastify';

export const orgRoutes = async (app: FastifyInstance) => {
  app.post('/orgs/auth', authOrgController);
  app.post('/orgs', createOrgController);
  app.get('/orgs/:id', findOrgByIdController);
};
