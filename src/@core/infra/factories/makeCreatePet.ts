import { CreatePetUseCase } from '@use-cases/createPetUseCase.js';
import { PrismaOrgRepository } from 'src/@core/infra/db/prismaOrgRepository.js';
import { PrismaPetRepository } from 'src/@core/infra/db/prismaPetRepository.js';

export const makeCreatePet = () => {
  const petRepository = new PrismaPetRepository();
  const orgRepository = new PrismaOrgRepository();

  const useCase = new CreatePetUseCase(petRepository, orgRepository);

  return useCase;
};
