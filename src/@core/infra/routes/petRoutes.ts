import { CreatePetController } from '@controllers/createPetController.js';
import { FastifyInstance } from 'fastify';
import { makeCreatePet } from 'src/@core/infra/factories/makeCreatePet.js';

export const petRoutes = async (app: FastifyInstance) => {
  const createPetUseCase = makeCreatePet();
  const createPetController = new CreatePetController(createPetUseCase);

  app.post('/pets', createPetController.handler.bind(createPetController));
};
