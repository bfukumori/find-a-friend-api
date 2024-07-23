import Pet from '@entities/pet.js';
import { NotFoundException } from '@errors/NotFoundException.js';
import { IPetRepository } from '@repositories/interfaces/IPetRepository.js';

export class FindPetByIdUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute(id: string): Promise<Pet> {
    const pet = await this.petRepository.findById(id);

    if (!pet) {
      throw new NotFoundException('Pet not found');
    }

    return pet;
  }
}
