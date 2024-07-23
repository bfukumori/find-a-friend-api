import { FindPetByIdUseCase } from '@use-cases/findPetByIdUseCase.js';
import { PrismaPetRepository } from 'src/@core/infra/db/prismaPetRepository.js';

export const makeFindPetById = () => {
  const useCase = new FindPetByIdUseCase(new PrismaPetRepository());

  return useCase;
};
