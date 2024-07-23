import {
  PetSize,
  EnergyLevel,
  IndependenceLevel,
  RoomSize,
  AgeGroupType,
} from '@constants/types.js';

export type CreatePetDTO = {
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
