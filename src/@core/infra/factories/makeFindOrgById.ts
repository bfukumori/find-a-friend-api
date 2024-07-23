import { FindOrgByIdUseCase } from '@use-cases/findOrgByIdUseCase.js';
import { PrismaOrgRepository } from 'src/@core/infra/db/prismaOrgRepository.js';

export const makeFindOrgById = () => {
  const useCase = new FindOrgByIdUseCase(new PrismaOrgRepository());

  return useCase;
};
