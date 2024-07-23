import { BCryptService } from '@services/BCryptService.js';
import { CreateOrgUseCase } from '@use-cases/createOrgUseCase.js';
import { PrismaOrgRepository } from 'src/@core/infra/db/prismaOrgRepository.js';

export const makeCreateOrg = () => {
  const orgRepository = new PrismaOrgRepository();
  const encrypter = new BCryptService();

  const useCase = new CreateOrgUseCase(orgRepository, encrypter);

  return useCase;
};
