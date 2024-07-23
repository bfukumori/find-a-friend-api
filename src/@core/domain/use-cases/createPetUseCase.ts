import {
  AgeGroupType,
  EnergyLevel,
  IndependenceLevel,
  PetSize,
  RoomSize,
} from '@constants/types.js';
import Pet from '@entities/pet.js';
import { NotFoundException } from '@errors/NotFoundException.js';
import { IOrgRepository } from '@repositories/interfaces/IOrgRepository.js';
import { IPetRepository } from '@repositories/interfaces/IPetRepository.js';

export type CreatePetRequest = {
  name: string;
  about: string;
  age: AgeGroupType;
  size: PetSize;
  energyLevel: EnergyLevel;
  independenceLevel: IndependenceLevel;
  roomSize: RoomSize;
  photos?: string[];
  requirements?: string[];
  organizationId: string;
};

export class CreatePetUseCase {
  constructor(
    private readonly petRepository: IPetRepository,
    private readonly orgRepository: IOrgRepository
  ) {}

  async execute(petData: CreatePetRequest): Promise<void> {
    const orgExists = await this.orgRepository.findById(petData.organizationId);

    if (!orgExists) {
      throw new NotFoundException('Organization not found');
    }

    const pet = new Pet(petData);

    await this.petRepository.create(pet);
  }
}
