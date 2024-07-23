import { FindAllPetsUseCase } from '@use-cases/findAllPetsUseCase.js';
import { PrismaPetRepository } from 'src/@core/infra/db/prismaPetRepository.js';

export const makeFindAllPets = () => {
  const petRepository = new PrismaPetRepository();

  const useCase = new FindAllPetsUseCase(petRepository);

  return useCase;
};
