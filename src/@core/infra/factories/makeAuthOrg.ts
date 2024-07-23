import { BCryptService } from '@services/BCryptService.js';
import { AuthOrgUseCase } from '@use-cases/authOrgUseCase.js';
import { PrismaOrgRepository } from 'src/@core/infra/db/prismaOrgRepository.js';

export const makeAuthOrg = () => {
  const orgRepository = new PrismaOrgRepository();
  const encrypter = new BCryptService();

  const useCase = new AuthOrgUseCase(orgRepository, encrypter);

  return useCase;
};
