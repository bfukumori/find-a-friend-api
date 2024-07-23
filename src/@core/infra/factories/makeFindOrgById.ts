import { FindOrgByIdUseCase } from '@use-cases/findOrgByIdUseCase.js';
import { PrismaOrgRepository } from 'src/@core/infra/db/prismaOrgRepository.js';

export const makeFindOrgById = () => {
  const orgRepository = new PrismaOrgRepository();

  const useCase = new FindOrgByIdUseCase(orgRepository);

  return useCase;
};
