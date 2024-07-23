import Pet from '@entities/pet.js';
import {
  FindAllParams,
  IPetRepository,
} from '@repositories/interfaces/IPetRepository.js';

export class FindAllPetsUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute(params: FindAllParams): Promise<Pet[]> {
    return await this.petRepository.findAll(params);
  }
}
