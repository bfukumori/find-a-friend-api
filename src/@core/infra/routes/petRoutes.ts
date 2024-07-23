import { CreatePetController } from '@controllers/createPetController.js';
import { FindAllPetsController } from '@controllers/findAllPetsController.js';
import { FindPetByIdController } from '@controllers/findPetByIdController.js';
import { makeFindAllPets } from '@factories/makeFindAllPets.js';
import { makeFindPetById } from '@factories/makeFindPetById.js';
import { verifyJwt } from '@middlewares/verifyJwt.js';
import { FastifyInstance } from 'fastify';
import { makeCreatePet } from 'src/@core/infra/factories/makeCreatePet.js';

export const petRoutes = async (app: FastifyInstance) => {
  const createPetUseCase = makeCreatePet();
  const createPetController = new CreatePetController(createPetUseCase);

  const findPetByIdUseCase = makeFindPetById();
  const findPetByIdController = new FindPetByIdController(findPetByIdUseCase);

  const findAllPetsUseCase = makeFindAllPets();
  const findAllPetsController = new FindAllPetsController(findAllPetsUseCase);

  app.post(
    '/pets',
    {
      onRequest: [verifyJwt],
    },
    createPetController.handler.bind(createPetController)
  );
  app.get('/pets', findAllPetsController.handler.bind(findAllPetsController));
  app.get(
    '/pets/:id',
    findPetByIdController.handler.bind(findPetByIdController)
  );
};
