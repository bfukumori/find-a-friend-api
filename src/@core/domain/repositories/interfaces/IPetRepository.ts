import Pet from '@entities/pet.js';

export type FindAllParams = {
  city: string;
  age?: string;
  energyLevel?: string;
  size?: string;
  independenceLevel?: string;
};

export interface IPetRepository {
  create(pet: Pet): Promise<void>;
  findAll(params: FindAllParams): Promise<Pet[]>;
  findById(id: string): Promise<Pet | null>;
}
