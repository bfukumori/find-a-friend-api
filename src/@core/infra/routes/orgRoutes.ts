import { CreateOrgController } from '@controllers/createOrgController.js';
import { FastifyInstance } from 'fastify';
import { makeCreateOrg } from 'src/@core/infra/factories/makeCreateOrg.js';

export const orgRoutes = async (app: FastifyInstance) => {
  const createOrgUseCase = makeCreateOrg();
  const createOrgController = new CreateOrgController(createOrgUseCase);

  app.post('/orgs', createOrgController.handler.bind(createOrgController));
};
