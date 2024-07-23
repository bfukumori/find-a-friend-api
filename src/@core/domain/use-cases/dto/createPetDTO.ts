import {
  AgeGroupType,
  EnergyLevel,
  IndependenceLevel,
  PetSize,
  RoomSize,
} from '@constants/types.js';

export type CreatePetRequestDTO = {
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
