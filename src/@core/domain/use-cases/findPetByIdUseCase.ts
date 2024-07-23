import { NotFoundException } from '@errors/NotFoundException.js';
import { IPetRepository } from '@repositories/interfaces/IPetRepository.js';

export class FindPetByIdUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute(id: string) {
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }
}
