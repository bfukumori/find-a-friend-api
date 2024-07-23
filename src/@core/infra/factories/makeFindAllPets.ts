import { FindAllPetsUseCase } from '@use-cases/findAllPetsUseCase.js';
import { PrismaPetRepository } from 'src/@core/infra/db/prismaPetRepository.js';

export const makeFindAllPets = () => {
  const useCase = new FindAllPetsUseCase(new PrismaPetRepository());

  return useCase;
};
