import Pet from '@entities/pet.js';
import { IPetRepository } from '@repositories/interfaces/IPetRepository.js';
import { CreatePetDTO } from './dto/createPetDTO.js';

export class CreatePetUseCase {
  constructor(private readonly petRepository: IPetRepository) {}

  async execute(petData: CreatePetDTO): Promise<void> {
    const pet = new Pet({
      ...petData,
      adopted: false,
      photos: [],
      requirements: [],
    });

    await this.petRepository.create(pet);
  }
}
