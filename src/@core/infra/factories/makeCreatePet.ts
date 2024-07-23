import { CreatePetUseCase } from '@use-cases/createPetUseCase.js';
import { PrismaOrgRepository } from 'src/@core/infra/db/prismaOrgRepository.js';
import { PrismaPetRepository } from 'src/@core/infra/db/prismaPetRepository.js';

export const makeCreatePet = () => {
  const useCase = new CreatePetUseCase(
    new PrismaPetRepository(),
    new PrismaOrgRepository()
  );

  return useCase;
};
