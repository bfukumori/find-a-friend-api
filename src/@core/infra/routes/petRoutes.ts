import { createPetController } from '@controllers/createPetController.js';
import { findAllPetsController } from '@controllers/findAllPetsController.js';
import { findPetByIdController } from '@controllers/findPetByIdController.js';
import { verifyJwt } from '@middlewares/verifyJwt.js';
import { FastifyInstance } from 'fastify';

export const petRoutes = async (app: FastifyInstance) => {
  app.post(
    '/pets',
    {
      onRequest: [verifyJwt],
    },
    createPetController
  );
  app.get('/pets', findAllPetsController);
  app.get('/pets/:id', findPetByIdController);
};
