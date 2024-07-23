import { AuthOrgController } from '@controllers/authOrgController.js';
import { CreateOrgController } from '@controllers/createOrgController.js';
import { FindOrgByIdController } from '@controllers/findOrgByIdController.js';
import { makeAuthOrg } from '@factories/makeAuthOrg.js';
import { makeFindOrgById } from '@factories/makeFindOrgById.js';
import { FastifyInstance } from 'fastify';
import { makeCreateOrg } from 'src/@core/infra/factories/makeCreateOrg.js';

export const orgRoutes = async (app: FastifyInstance) => {
  const createOrgUseCase = makeCreateOrg();
  const createOrgController = new CreateOrgController(createOrgUseCase);

  const findOrgByIdUseCase = makeFindOrgById();
  const findOrgByIdController = new FindOrgByIdController(findOrgByIdUseCase);

  const authOrgUseCase = makeAuthOrg();
  const authOrgController = new AuthOrgController(authOrgUseCase);

  app.post('/orgs/auth', authOrgController.handler.bind(authOrgController));
  app.post('/orgs', createOrgController.handler.bind(createOrgController));
  app.get(
    '/orgs/:id',
    findOrgByIdController.handler.bind(findOrgByIdController)
  );
};
