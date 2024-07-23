import { BCryptService } from '@services/BCryptService.js';
import { CreateOrgUseCase } from '@use-cases/createOrgUseCase.js';
import { PrismaOrgRepository } from 'src/@core/infra/db/prismaOrgRepository.js';

export const makeCreateOrg = () => {
  const useCase = new CreateOrgUseCase(
    new PrismaOrgRepository(),
    new BCryptService()
  );

  return useCase;
};
