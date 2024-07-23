import Pet from '@entities/pet.js';
import { NotFoundException } from '@errors/NotFoundException.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';
import { IPetRepository } from '@repositories/interfaces/IPetRepository.js';
import { CreatePetDTO } from './dto/createPetDTO.js';

export class CreatePetUseCase {
  constructor(
    private readonly petRepository: IPetRepository,
    private readonly orgRepository: IOrgRepository
  ) {}

  async execute(petData: CreatePetDTO): Promise<void> {
    const orgExists = await this.orgRepository.findById(petData.organizationId);

    if (!orgExists) {
      throw new NotFoundException('Organization not found');
    }

    const pet = new Pet({
      ...petData,
      adopted: false,
      photos: [],
      requirements: [],
    });

    await this.petRepository.create(pet);
  }
}
