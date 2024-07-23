import { BCryptService } from '@services/BCryptService.js';
import { AuthOrgUseCase } from '@use-cases/authOrgUseCase.js';
import { PrismaOrgRepository } from 'src/@core/infra/db/prismaOrgRepository.js';

export const makeAuthOrg = () => {
  const useCase = new AuthOrgUseCase(
    new PrismaOrgRepository(),
    new BCryptService()
  );

  return useCase;
};
