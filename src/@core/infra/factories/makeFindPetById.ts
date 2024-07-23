import { FindPetByIdUseCase } from '@use-cases/findPetByIdUseCase.js';
import { PrismaPetRepository } from 'src/@core/infra/db/prismaPetRepository.js';

export const makeFindPetById = () => {
  const petRepository = new PrismaPetRepository();

  const useCase = new FindPetByIdUseCase(petRepository);

  return useCase;
};
