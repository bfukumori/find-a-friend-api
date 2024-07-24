import {
  AgeGroupType,
  EnergyLevel,
  IndependenceLevel,
  PetSize,
} from '@constants/types.js';
import Pet from '@entities/pet.js';

export type FindAllParams = {
  city: string;
  age?: AgeGroupType;
  energyLevel?: EnergyLevel;
  size?: PetSize;
  independenceLevel?: IndependenceLevel;
};

export interface IPetRepository {
  create(pet: Pet): Promise<Pet>;
  findAll(params: FindAllParams): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
}
